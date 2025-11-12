'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { submitApplication } from '@/lib/supabase';
import { useToast } from '@/components/ui/toast';

export default function ApplyPage() {
  const { showToast } = useToast()
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    startupName: '',
    website: '',
    stage: '',
    description: '',
    targetMarket: '',
    revenueModel: '',
    fundingRequirement: '',
    preferredProgram: ''
  });

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Tell us about yourself' },
    { number: 2, title: 'Startup Details', description: 'Share your venture information' },
    { number: 3, title: 'Business Model', description: 'Explain your business approach' },
    { number: 4, title: 'Review & Submit', description: 'Confirm and submit application' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'startupName', 'stage', 'description', 'targetMarket', 'revenueModel', 'preferredProgram']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData].trim())
    
    if (missingFields.length > 0) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitApplication(formData)
      
      if (result.error) {
        showToast(result.error, 'error')
      } else {
        showToast('Application submitted successfully! We\'ll review it and get back to you within 5-7 business days.', 'success')
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          linkedin: '',
          startupName: '',
          website: '',
          stage: '',
          description: '',
          targetMarket: '',
          revenueModel: '',
          fundingRequirement: '',
          preferredProgram: ''
        })
        setCurrentStep(1)
      }
    } catch (error) {
      console.error('Application submission error:', error)
      showToast('Failed to submit application. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Apply to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SJCE-STEP</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Start your journey to transform your startup vision into reality
              </p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                {steps.map((step) => (
                  <div key={step.number} className="flex-1 relative">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                          currentStep >= step.number
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {currentStep > step.number ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          step.number
                        )}
                      </div>
                      <div className="text-center mt-2 hidden md:block">
                        <p className="text-sm font-medium">{step.title}</p>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    {step.number < totalSteps && (
                      <div
                        className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 ${
                          currentStep > step.number ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-border">
              <CardHeader>
                <h2 className="text-2xl font-bold">{steps[currentStep - 1].title}</h2>
                <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="John" 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            placeholder="Doe" 
                            required 
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="john@example.com" 
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+91 98765 43210" 
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn Profile</Label>
                        <Input 
                          id="linkedin" 
                          value={formData.linkedin}
                          onChange={(e) => handleInputChange('linkedin', e.target.value)}
                          placeholder="https://linkedin.com/in/yourprofile" 
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="startupName">Startup Name *</Label>
                        <Input 
                          id="startupName" 
                          value={formData.startupName}
                          onChange={(e) => handleInputChange('startupName', e.target.value)}
                          placeholder="Your Startup Name" 
                          required 
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input 
                          id="website" 
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://yourstartup.com" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="stage">Current Stage *</Label>
                        <Select value={formData.stage} onValueChange={(value) => handleInputChange('stage', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select stage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="idea">Idea Stage</SelectItem>
                            <SelectItem value="mvp">MVP Developed</SelectItem>
                            <SelectItem value="early">Early Revenue</SelectItem>
                            <SelectItem value="growth">Growth Stage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="description">Startup Description *</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="Describe your startup, the problem you're solving, and your solution"
                          rows={5}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="targetMarket">Target Market *</Label>
                        <Textarea
                          id="targetMarket"
                          value={formData.targetMarket}
                          onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                          placeholder="Describe your target market and customer segments"
                          rows={4}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="revenue">Revenue Model *</Label>
                        <Textarea
                          id="revenue"
                          value={formData.revenueModel}
                          onChange={(e) => handleInputChange('revenueModel', e.target.value)}
                          placeholder="Explain how your startup generates or plans to generate revenue"
                          rows={4}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="funding">Funding Requirement</Label>
                        <Input 
                          id="funding" 
                          value={formData.fundingRequirement}
                          onChange={(e) => handleInputChange('fundingRequirement', e.target.value)}
                          placeholder="e.g., ₹25 lakhs" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="program">Preferred Program *</Label>
                        <Select value={formData.preferredProgram} onValueChange={(value) => handleInputChange('preferredProgram', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="incubation">Incubation Program</SelectItem>
                            <SelectItem value="acceleration">Acceleration Program</SelectItem>
                            <SelectItem value="mentorship">Mentorship Program</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="bg-muted/50 p-6 rounded-lg">
                        <h3 className="font-semibold mb-4">Application Summary</h3>
                        <p className="text-muted-foreground mb-4">
                          Please review your application details before submitting. You can go back to edit any section.
                        </p>
                        <div className="space-y-2 text-sm">
                          <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                          <p><strong>Email:</strong> {formData.email}</p>
                          <p><strong>Phone:</strong> {formData.phone}</p>
                          {formData.linkedin && <p><strong>LinkedIn:</strong> {formData.linkedin}</p>}
                          <p><strong>Startup:</strong> {formData.startupName}</p>
                          {formData.website && <p><strong>Website:</strong> {formData.website}</p>}
                          <p><strong>Stage:</strong> {formData.stage}</p>
                          <p><strong>Preferred Program:</strong> {formData.preferredProgram}</p>
                          {formData.fundingRequirement && <p><strong>Funding Requirement:</strong> {formData.fundingRequirement}</p>}
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <input type="checkbox" id="terms" className="mt-1" required />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the terms and conditions and confirm that all information provided is accurate.
                        </Label>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    {currentStep < totalSteps ? (
                      <Button type="button" onClick={nextStep}>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Submitting...
                          </>
                        ) : (
                          'Submit Application'
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
