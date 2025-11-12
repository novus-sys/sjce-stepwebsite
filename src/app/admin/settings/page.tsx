'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Settings, Globe, Mail, Shield, Database, Bell, Users, Palette, Save, RefreshCw } from 'lucide-react'

interface SystemSettings {
  // General Settings
  site_name: string
  site_description: string
  site_url: string
  admin_email: string
  contact_email: string
  phone: string
  address: string
  
  // Application Settings
  applications_enabled: boolean
  max_applications_per_cycle: number
  application_deadline: string
  auto_approve_applications: boolean
  
  // Email Settings
  smtp_host: string
  smtp_port: number
  smtp_username: string
  smtp_password: string
  email_from_name: string
  email_from_address: string
  
  // Notification Settings
  email_notifications: boolean
  sms_notifications: boolean
  push_notifications: boolean
  notification_frequency: 'immediate' | 'daily' | 'weekly'
  
  // Security Settings
  two_factor_auth: boolean
  session_timeout: number
  password_min_length: number
  require_password_change: boolean
  
  // Integration Settings
  google_analytics_id: string
  facebook_pixel_id: string
  linkedin_company_id: string
  
  // Maintenance
  maintenance_mode: boolean
  maintenance_message: string
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    // General Settings
    site_name: 'SJCE-STEP',
    site_description: 'Premium Startup Incubator & Accelerator',
    site_url: 'https://sjce-step.in',
    admin_email: 'admin@sjce-step.in',
    contact_email: 'info@sjce-step.in',
    phone: '+91 821 2548000',
    address: 'JSS Science & Technology University, Mysuru, Karnataka 570006',
    
    // Application Settings
    applications_enabled: true,
    max_applications_per_cycle: 50,
    application_deadline: '2024-12-31',
    auto_approve_applications: false,
    
    // Email Settings
    smtp_host: 'smtp.gmail.com',
    smtp_port: 587,
    smtp_username: 'noreply@sjce-step.in',
    smtp_password: '',
    email_from_name: 'SJCE-STEP',
    email_from_address: 'noreply@sjce-step.in',
    
    // Notification Settings
    email_notifications: true,
    sms_notifications: false,
    push_notifications: true,
    notification_frequency: 'immediate',
    
    // Security Settings
    two_factor_auth: true,
    session_timeout: 30,
    password_min_length: 8,
    require_password_change: false,
    
    // Integration Settings
    google_analytics_id: '',
    facebook_pixel_id: '',
    linkedin_company_id: '',
    
    // Maintenance
    maintenance_mode: false,
    maintenance_message: 'We are currently performing scheduled maintenance. Please check back soon.'
  })

  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    // TODO: Save settings to Supabase
    setTimeout(() => {
      setLoading(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }, 1000)
  }

  const handleReset = () => {
    // Reset to default values
    setSettings({
      ...settings,
      // Reset specific values as needed
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure system preferences and integrations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Site Information
                </CardTitle>
                <CardDescription>
                  Basic information about your website and organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site_name">Site Name</Label>
                    <Input
                      id="site_name"
                      value={settings.site_name}
                      onChange={(e) => setSettings({...settings, site_name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site_url">Site URL</Label>
                    <Input
                      id="site_url"
                      value={settings.site_url}
                      onChange={(e) => setSettings({...settings, site_url: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site_description">Site Description</Label>
                  <Textarea
                    id="site_description"
                    value={settings.site_description}
                    onChange={(e) => setSettings({...settings, site_description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin_email">Admin Email</Label>
                    <Input
                      id="admin_email"
                      type="email"
                      value={settings.admin_email}
                      onChange={(e) => setSettings({...settings, admin_email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact_email">Contact Email</Label>
                    <Input
                      id="contact_email"
                      type="email"
                      value={settings.contact_email}
                      onChange={(e) => setSettings({...settings, contact_email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => setSettings({...settings, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={settings.address}
                      onChange={(e) => setSettings({...settings, address: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  System Maintenance
                </CardTitle>
                <CardDescription>
                  Control system maintenance and downtime
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">
                      Enable to show maintenance page to visitors
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenance_mode}
                    onCheckedChange={(checked: boolean) => setSettings({...settings, maintenance_mode: checked})}
                  />
                </div>
                {settings.maintenance_mode && (
                  <div className="space-y-2">
                    <Label htmlFor="maintenance_message">Maintenance Message</Label>
                    <Textarea
                      id="maintenance_message"
                      value={settings.maintenance_message}
                      onChange={(e) => setSettings({...settings, maintenance_message: e.target.value})}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Application Settings */}
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Application Management
              </CardTitle>
              <CardDescription>
                Configure startup application settings and limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Accept Applications</Label>
                  <p className="text-sm text-gray-500">
                    Allow new startup applications to be submitted
                  </p>
                </div>
                <Switch
                  checked={settings.applications_enabled}
                  onCheckedChange={(checked: boolean) => setSettings({...settings, applications_enabled: checked})}
                />
              </div>
              
              {settings.applications_enabled && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="max_applications">Max Applications per Cycle</Label>
                      <Input
                        id="max_applications"
                        type="number"
                        value={settings.max_applications_per_cycle}
                        onChange={(e) => setSettings({...settings, max_applications_per_cycle: parseInt(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="application_deadline">Application Deadline</Label>
                      <Input
                        id="application_deadline"
                        type="date"
                        value={settings.application_deadline}
                        onChange={(e) => setSettings({...settings, application_deadline: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-approve Applications</Label>
                      <p className="text-sm text-gray-500">
                        Automatically approve applications that meet criteria
                      </p>
                    </div>
                    <Switch
                      checked={settings.auto_approve_applications}
                      onCheckedChange={(checked: boolean) => setSettings({...settings, auto_approve_applications: checked})}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Email Configuration
              </CardTitle>
              <CardDescription>
                Configure SMTP settings for sending emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp_host">SMTP Host</Label>
                  <Input
                    id="smtp_host"
                    value={settings.smtp_host}
                    onChange={(e) => setSettings({...settings, smtp_host: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp_port">SMTP Port</Label>
                  <Input
                    id="smtp_port"
                    type="number"
                    value={settings.smtp_port}
                    onChange={(e) => setSettings({...settings, smtp_port: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp_username">SMTP Username</Label>
                  <Input
                    id="smtp_username"
                    value={settings.smtp_username}
                    onChange={(e) => setSettings({...settings, smtp_username: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp_password">SMTP Password</Label>
                  <Input
                    id="smtp_password"
                    type="password"
                    value={settings.smtp_password}
                    onChange={(e) => setSettings({...settings, smtp_password: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email_from_name">From Name</Label>
                  <Input
                    id="email_from_name"
                    value={settings.email_from_name}
                    onChange={(e) => setSettings({...settings, email_from_name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email_from_address">From Email Address</Label>
                  <Input
                    id="email_from_address"
                    type="email"
                    value={settings.email_from_address}
                    onChange={(e) => setSettings({...settings, email_from_address: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={settings.email_notifications}
                  onCheckedChange={(checked: boolean) => setSettings({...settings, email_notifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications via SMS
                  </p>
                </div>
                <Switch
                  checked={settings.sms_notifications}
                  onCheckedChange={(checked: boolean) => setSettings({...settings, sms_notifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive browser push notifications
                  </p>
                </div>
                <Switch
                  checked={settings.push_notifications}
                  onCheckedChange={(checked: boolean) => setSettings({...settings, push_notifications: checked})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notification_frequency">Notification Frequency</Label>
                <Select
                  value={settings.notification_frequency}
                  onValueChange={(value: 'immediate' | 'daily' | 'weekly') => 
                    setSettings({...settings, notification_frequency: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Configuration
              </CardTitle>
              <CardDescription>
                Configure security settings and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">
                    Require 2FA for admin accounts
                  </p>
                </div>
                <Switch
                  checked={settings.two_factor_auth}
                  onCheckedChange={(checked: boolean) => setSettings({...settings, two_factor_auth: checked})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session_timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session_timeout"
                    type="number"
                    value={settings.session_timeout}
                    onChange={(e) => setSettings({...settings, session_timeout: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password_min_length">Minimum Password Length</Label>
                  <Input
                    id="password_min_length"
                    type="number"
                    value={settings.password_min_length}
                    onChange={(e) => setSettings({...settings, password_min_length: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Password Change</Label>
                  <p className="text-sm text-gray-500">
                    Force users to change passwords periodically
                  </p>
                </div>
                <Switch
                  checked={settings.require_password_change}
                  onCheckedChange={(checked: boolean) => setSettings({...settings, require_password_change: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Settings */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Third-party Integrations
              </CardTitle>
              <CardDescription>
                Configure analytics and social media integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                <Input
                  id="google_analytics_id"
                  placeholder="G-XXXXXXXXXX"
                  value={settings.google_analytics_id}
                  onChange={(e) => setSettings({...settings, google_analytics_id: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="facebook_pixel_id">Facebook Pixel ID</Label>
                <Input
                  id="facebook_pixel_id"
                  placeholder="123456789012345"
                  value={settings.facebook_pixel_id}
                  onChange={(e) => setSettings({...settings, facebook_pixel_id: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="linkedin_company_id">LinkedIn Company ID</Label>
                <Input
                  id="linkedin_company_id"
                  placeholder="12345678"
                  value={settings.linkedin_company_id}
                  onChange={(e) => setSettings({...settings, linkedin_company_id: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
