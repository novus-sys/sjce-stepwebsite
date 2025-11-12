# Deployment Guide - SJCE-STEP Website

## Overview
Complete deployment guide for hosting the SJCE-STEP website and admin panel on a private VM with Supabase for backend services.

---

## Architecture

```
Internet → Domain → VM (Nginx) → Next.js App (Port 3000)
                                  ├─ Public Website (/)
                                  └─ Admin Panel (/admin)
                    
VM → Supabase Cloud → PostgreSQL Database
                   → Storage Buckets (images, documents)
                   → Authentication
                   → Real-time (optional)
```

---

## 1. VM Requirements

### Minimum Specifications
- **OS**: Ubuntu 22.04 LTS
- **RAM**: 4GB (2GB for app, 2GB for system)
- **Storage**: 50GB SSDs recommended
- **CPU**: 2 cores (4 cores recommended)
- **Network**: Static IP or domain pointing to VM

### Required Software
- Node.js 18+ LTS
- Nginx
- PM2
- Git
- Certbot (SSL)

---

## 2. Supabase Setup

### Create Supabase Project

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com
   - Sign in or create account
   - Click "New Project"

2. **Project Configuration**
   - **Name**: SJCE-STEP Website
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to your VM (e.g., ap-south-1 for India)
   - **Pricing Plan**: Free tier to start (upgrade as needed)

3. **Wait for Project Setup** (takes 2-3 minutes)

### Configure Storage Buckets

1. **Navigate to Storage** in Supabase Dashboard

2. **Create Buckets**:
   ```
   Bucket Name       | Public | File Size Limit
   ------------------|--------|----------------
   startups          | Yes    | 5 MB
   blog              | Yes    | 5 MB
   events            | Yes    | 5 MB
   team              | Yes    | 5 MB
   documents         | No     | 10 MB
   ```

3. **Set Bucket Policies**:
   
   For **public buckets** (startups, blog, events, team):
   ```sql
   -- Allow public read access
   CREATE POLICY "Public Access"
   ON storage.objects FOR SELECT
   USING ( bucket_id = 'startups' );
   
   -- Allow authenticated uploads (admin only)
   CREATE POLICY "Authenticated Upload"
   ON storage.objects FOR INSERT
   WITH CHECK ( bucket_id = 'startups' AND auth.role() = 'authenticated' );
   
   -- Allow authenticated delete (admin only)
   CREATE POLICY "Authenticated Delete"
   ON storage.objects FOR DELETE
   USING ( bucket_id = 'startups' AND auth.role() = 'authenticated' );
   ```
   
   Repeat for each public bucket (blog, events, team).
   
   For **private bucket** (documents):
   ```sql
   -- Only authenticated users can access
   CREATE POLICY "Authenticated Access"
   ON storage.objects FOR SELECT
   USING ( bucket_id = 'documents' AND auth.role() = 'authenticated' );
   
   CREATE POLICY "Authenticated Upload"
   ON storage.objects FOR INSERT
   WITH CHECK ( bucket_id = 'documents' AND auth.role() = 'authenticated' );
   
   CREATE POLICY "Authenticated Delete"
   ON storage.objects FOR DELETE
   USING ( bucket_id = 'documents' AND auth.role() = 'authenticated' );
   ```

### Get API Credentials

1. **Go to Project Settings** → **API**

2. **Copy these values**:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (for client-side)
   - **service_role key**: `eyJhbGc...` (for server-side, keep secret!)

3. **Save these securely** - you'll need them for environment variables

### Setup Database Schema

1. **Go to SQL Editor** in Supabase Dashboard

2. **Run Database Schema** (create tables for your app):
   ```sql
   -- This will be created based on your data models
   -- See section 7 for complete schema
   ```

### Configure Authentication

1. **Go to Authentication** → **Providers**

2. **Enable Email Provider**:
   - Toggle "Enable Email provider"
   - Configure email templates (optional)
   - Set site URL: `https://sjce-step.com`

3. **Create Admin User**:
   - Go to Authentication → Users
   - Click "Add user"
   - Email: `admin@sjce-step.com`
   - Password: Generate strong password
   - Auto-confirm email: Yes
   - Save credentials securely

### Configure Email (Optional)

1. **Go to Project Settings** → **Auth** → **SMTP Settings**

2. **Configure SMTP**:
   - Enable custom SMTP
   - Host: `smtp.gmail.com`
   - Port: `587`
   - Username: Your email
   - Password: App password
   - Sender email: `noreply@sjce-step.com`

---

## 3. VM Initial Setup

### Update System

```bash
# Update package list
sudo apt update && sudo apt upgrade -y
```

### Install Node.js and Dependencies

```bash
# Install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Git
sudo apt install -y git
```

### Clone and Setup Application

```bash
# Create application directory
sudo mkdir -p /var/www/sjce-step
sudo chown $USER:$USER /var/www/sjce-step

# Clone repository
cd /var/www/sjce-step
git clone <your-repo-url> .

# Install dependencies
npm install
```

### Environment Configuration

```bash
# Create production environment file
nano .env.production
```

**Environment Variables:**
```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://sjce-step.com
PORT=3000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Supabase Storage Buckets
NEXT_PUBLIC_STORAGE_BUCKET_STARTUPS=startups
NEXT_PUBLIC_STORAGE_BUCKET_BLOG=blog
NEXT_PUBLIC_STORAGE_BUCKET_EVENTS=events
NEXT_PUBLIC_STORAGE_BUCKET_TEAM=team
NEXT_PUBLIC_STORAGE_BUCKET_DOCUMENTS=documents

# Admin Email (for notifications - optional)
ADMIN_EMAIL=admin@sjce-step.com

# Email Configuration (optional - for contact forms)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@sjce-step.com
```

### Build Application

```bash
# Build for production
npm run build

# Test the build
npm start
```

### Setup PM2

```bash
# Start application with PM2
pm2 start npm --name "sjce-step" -- start

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the command output instructions

# Monitor application
pm2 monit
```

---

## 4. Nginx Configuration

### Install Nginx

```bash
sudo apt install -y nginx
```

### Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/sjce-step
```

**Site Configuration:**
```nginx
# HTTP to HTTPS redirect
server {
    listen 80;
    server_name sjce-step.com www.sjce-step.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name sjce-step.com www.sjce-step.com;

    # SSL certificates (will be added by Certbot)
    ssl_certificate /etc/letsencrypt/live/sjce-step.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sjce-step.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Max upload size (for admin panel)
    client_max_body_size 10M;

    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Image optimization
    location /_next/image {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=86400";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;
}
```


### Enable Site

```bash
# Enable configuration
sudo ln -s /etc/nginx/sites-available/sjce-step /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## 5. SSL Certificates

### Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Obtain Certificate

```bash
# Main website
sudo certbot --nginx -d sjce-step.com -d www.sjce-step.com
```

### Auto-renewal

```bash
# Test renewal
sudo certbot renew --dry-run

# Certbot automatically sets up a cron job for renewal
# Verify it's there
sudo systemctl status certbot.timer
```

---

## 6. Database Schema Setup

### Option 1: Using Supabase Dashboard

1. Go to **SQL Editor** in Supabase Dashboard
2. Create a new query
3. Run your database schema SQL (see `database/schema.sql` in your project)
4. Verify tables are created in **Table Editor**

### Option 2: Using Migration Tools

If using Prisma or similar ORM:

```bash
# Navigate to app directory
cd /var/www/sjce-step

# Push schema to Supabase
npx prisma db push

# OR run migrations
npx prisma migrate deploy
```

### Verify Database

1. Go to **Table Editor** in Supabase Dashboard
2. Verify all tables are created:
   - startups
   - blog_articles
   - blog_authors
   - events
   - event_speakers
   - event_registrations
   - team_members
   - testimonials
   - applications
   - contact_submissions

---

## 7. Supabase Integration in Application

### Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Supabase Client Setup

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (with service role key)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
```

### Storage Helper Functions

Create `src/lib/storage.ts`:

```typescript
import { supabaseAdmin } from './supabase';

export const uploadFile = async (
  bucketName: string,
  filePath: string,
  file: File | Buffer,
  contentType?: string
) => {
  const { data, error } = await supabaseAdmin.storage
    .from(bucketName)
    .upload(filePath, file, {
      contentType,
      upsert: false,
    });

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabaseAdmin.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return publicUrl;
};

export const deleteFile = async (bucketName: string, filePath: string) => {
  const { error } = await supabaseAdmin.storage
    .from(bucketName)
    .remove([filePath]);

  if (error) throw error;
};

export const getFileUrl = (bucketName: string, filePath: string) => {
  const { data: { publicUrl } } = supabaseAdmin.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return publicUrl;
};
```

---

## 8. Backup Strategy

### Database Backups (Supabase)

**Automatic Backups:**
- Supabase automatically backs up your database daily
- Free tier: 7 days of backup retention
- Pro tier: 30 days of backup retention
- Backups can be restored from Supabase Dashboard

**Manual Backups (Optional):**

```bash
# Create backup directory
mkdir -p /home/$USER/backups/database

# Create backup script
nano /home/$USER/scripts/backup-supabase.sh
```

**Backup Script:**
```bash
#!/bin/bash
BACKUP_DIR="/home/$USER/backups/database"
DATE=$(date +%Y%m%d_%H%M%S)
SUPABASE_PROJECT_REF="your_project_ref"
SUPABASE_DB_PASSWORD="your_db_password"

# Backup using pg_dump over SSL
pg_dump "postgresql://postgres:$SUPABASE_DB_PASSWORD@db.$SUPABASE_PROJECT_REF.supabase.co:5432/postgres" | gzip > $BACKUP_DIR/db_backup_$DATE.sql.gz

# Keep only last 30 days
find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +30 -delete

echo "Database backup completed: db_backup_$DATE.sql.gz"
```

```bash
# Make executable
chmod +x /home/$USER/scripts/backup-supabase.sh

# Add to crontab (weekly on Sunday at 2 AM)
crontab -e
0 2 * * 0 /home/$USER/scripts/backup-supabase.sh
```

### Storage Backups (Supabase)

**Note:** Supabase Storage files are automatically backed up as part of the project backup.

For additional safety, you can sync important files locally:

```bash
# Create storage backup directory
mkdir -p /home/$USER/backups/storage

# Install Supabase CLI (optional)
npm install -g supabase

# Or use rclone to sync storage buckets (advanced)
```

---

## 9. Monitoring & Maintenance

### System Monitoring

```bash
# Install monitoring tools
sudo apt install -y htop iotop nethogs

# Monitor system resources
htop

# Monitor disk I/O
sudo iotop

# Monitor network
sudo nethogs
```

### Application Logs

```bash
# PM2 logs
pm2 logs sjce-step

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Health Checks

Create monitoring script:
```bash
nano /home/$USER/scripts/health-check.sh
```

```bash
#!/bin/bash

# Check Next.js app
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✓ Next.js app is running"
else
    echo "✗ Next.js app is down - Restarting..."
    pm2 restart sjce-step
    echo "App restarted at $(date)" >> /home/$USER/logs/restart.log
fi

# Check Nginx
if systemctl is-active --quiet nginx; then
    echo "✓ Nginx is running"
else
    echo "✗ Nginx is down - Restarting..."
    sudo systemctl restart nginx
fi

# Check disk space
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "⚠ Warning: Disk usage is at ${DISK_USAGE}%"
fi
```

```bash
chmod +x /home/$USER/scripts/health-check.sh

# Run every 5 minutes
crontab -e
*/5 * * * * /home/$USER/scripts/health-check.sh >> /home/$USER/logs/health-check.log 2>&1
```

---

## 10. Deployment Workflow

### Manual Deployment

```bash
# SSH into VM
ssh user@your-vm-ip

# Navigate to app directory
cd /var/www/sjce-step

# Pull latest changes
git pull origin main

# Install new dependencies (if any)
npm install

# Run database migrations (if any)
npx prisma db push

# Rebuild application
npm run build

# Restart PM2
pm2 restart sjce-step

# Reload Nginx (if config changed)
sudo systemctl reload nginx
```

### Automated Deployment with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VM

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Deploy to Production VM
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VM_HOST }}
          username: ${{ secrets.VM_USER }}
          key: ${{ secrets.VM_SSH_KEY }}
          script: |
            cd /var/www/sjce-step
            git pull origin main
            npm install
            npm run build
            pm2 restart sjce-step
            echo "Deployment completed at $(date)"
```

---

## 11. Security Checklist

- [x] Firewall configured (UFW)
- [x] SSH key-based authentication only
- [x] SSL certificates installed
- [x] Supabase service role key secured (never expose client-side)
- [x] Environment variables protected (.env.production not in git)
- [x] Admin panel behind Supabase authentication
- [x] Supabase RLS policies configured
- [x] Regular backups (automatic via Supabase)
- [x] Fail2ban installed (optional)
- [x] Auto-updates enabled for VM

### Configure Firewall

```bash
# Install UFW
sudo apt install -y ufw

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## 12. Domain Configuration

### DNS Records

Add these DNS records at your domain registrar:

```
Type    Name    Value           TTL
A       @       YOUR_VM_IP      3600
A       www     YOUR_VM_IP      3600
```

---

## 13. Post-Deployment Testing

### Test Checklist

```bash
# Test main website
curl -I https://sjce-step.com
# Expected: HTTP/2 200

# Test www redirect
curl -I https://www.sjce-step.com
# Expected: HTTP/2 200

# Test admin panel
curl -I https://sjce-step.com/admin
# Expected: HTTP/2 200

# Test PM2 status
pm2 status
# Expected: sjce-step status: online

# Test SSL certificates
sudo certbot certificates
# Expected: Valid certificates for sjce-step.com

# Test Nginx configuration
sudo nginx -t
# Expected: syntax is ok, test is successful
```

### Functional Testing

1. **Public Website**:
   - Visit https://sjce-step.com
   - Check all pages load correctly
   - Verify images load from Supabase Storage
   - Test contact form submission

2. **Admin Panel**:
   - Visit https://sjce-step.com/admin
   - Login with admin credentials
   - Test creating a startup
   - Test uploading an image
   - Test creating a blog post
   - Verify data appears on public site

3. **Supabase Connection**:
   - Check Supabase Dashboard for new data
   - Verify storage buckets have uploaded files
   - Check authentication logs

---

## 14. Troubleshooting

### Common Issues

**Next.js app won't start:**
```bash
pm2 logs sjce-step
# Check for errors in environment variables or build issues
# Verify Supabase credentials are correct
```

**Supabase connection failed:**
```bash
# Check environment variables
cat .env.production | grep SUPABASE
# Verify keys match Supabase Dashboard
# Check Supabase project status in dashboard
```

**Image upload fails:**
```bash
# Check Supabase Storage bucket policies
# Verify SUPABASE_SERVICE_ROLE_KEY is set
# Check bucket names match environment variables
```

**SSL certificate issues:**
```bash
sudo certbot renew --dry-run
sudo nginx -t
sudo systemctl restart nginx
```

**502 Bad Gateway:**
```bash
# Check if Next.js is running
pm2 status
# Restart if needed
pm2 restart sjce-step
# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

---

## 15. Summary

### Your Tech Stack

**Frontend & Backend:**
- ✅ Next.js 14+ (App Router)
- ✅ TypeScript
- ✅ TailwindCSS + shadcn/ui

**Backend Services (Supabase Cloud):**
- ✅ PostgreSQL Database
- ✅ Storage Buckets (Images & Documents)
- ✅ Authentication (Admin login)
- ✅ Automatic Backups

**Infrastructure (Your VM):**
- ✅ Nginx (Reverse Proxy + SSL)
- ✅ PM2 (Process Manager)
- ✅ Let's Encrypt (Free SSL)
- ✅ Ubuntu 22.04 LTS

### URLs

- **Main Website**: `https://sjce-step.com`
- **Admin Panel**: `https://sjce-step.com/admin`
- **Supabase Dashboard**: `https://supabase.com/dashboard`

### Key Benefits

✅ **Simple Architecture**: Next.js on VM + Supabase Cloud
✅ **Managed Database**: No PostgreSQL maintenance needed
✅ **Automatic Backups**: Supabase handles daily backups
✅ **Scalable Storage**: Supabase Storage with CDN
✅ **Built-in Auth**: Supabase Authentication for admin
✅ **Cost Effective**: Free tier available, pay as you grow
✅ **Easy Deployment**: Single command to update

### Quick Reference Commands

```bash
# Deploy updates
cd /var/www/sjce-step && git pull && npm install && npm run build && pm2 restart sjce-step

# View logs
pm2 logs sjce-step

# Check status
pm2 status

# Restart app
pm2 restart sjce-step

# Check Nginx
sudo nginx -t && sudo systemctl status nginx

# Renew SSL
sudo certbot renew
```

### Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **PM2 Docs**: https://pm2.keymetrics.io/docs
- **Nginx Docs**: https://nginx.org/en/docs

---

**Deployment Complete! 🚀**

Your SJCE-STEP website is now live with a powerful admin panel, running on your private VM with Supabase handling all backend services.
