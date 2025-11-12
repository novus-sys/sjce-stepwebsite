'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, Building2, TrendingUp, Users, Rocket, 
  ExternalLink, ArrowRight, Filter, X, Sparkles,
  Target, Award, Calendar, Globe
} from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { fetchStartups } from '@/lib/supabase';

export default function StartupsPage() {
  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [fundingFilter, setFundingFilter] = useState('All Stages');
  const [batchFilter, setBatchFilter] = useState('All Batches');
  const [statusFilter, setStatusFilter] = useState('all');

  // Load startups data
  useEffect(() => {
    const loadStartups = async () => {
      try {
        const data = await fetchStartups();
        console.log('Loaded startups:', data); // Debug log
        setStartups(data);
      } catch (error) {
        console.error('Failed to load startups:', error);
        setStartups([]);
      } finally {
        setLoading(false);
      }
    };

    loadStartups();
  }, []);

  // Generate dynamic filter options from data
  const categories = useMemo(() => {
    const cats = ['All Categories', ...new Set(startups.map(s => s.category).filter(Boolean))];
    return cats;
  }, [startups]);

  const fundingStages = useMemo(() => {
    const stages = ['All Stages', ...new Set(startups.map(s => s.funding_stage).filter(Boolean))];
    return stages;
  }, [startups]);

  const batches = useMemo(() => {
    const batchList = ['All Batches', ...new Set(startups.map(s => s.batch).filter(Boolean))];
    return batchList;
  }, [startups]);

  const statuses = useMemo(() => {
    const statusList = [
      { value: 'all', label: 'All Status' },
      { value: 'active', label: 'Active' },
      { value: 'graduated', label: 'Graduated' },
      { value: 'exited', label: 'Exited' }
    ];
    return statusList;
  }, []);

  // Filter and search logic
  const filteredStartups = useMemo(() => {
    console.log('Filtering startups:', { 
      totalStartups: startups.length, 
      filters: { searchQuery, categoryFilter, fundingFilter, batchFilter, statusFilter }
    });
    
    const filtered = startups.filter(startup => {
      const matchesSearch = searchQuery === '' || 
        startup.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = categoryFilter === 'All Categories' || startup.category === categoryFilter;
      const matchesFunding = fundingFilter === 'All Stages' || startup.funding_stage === fundingFilter;
      const matchesBatch = batchFilter === 'All Batches' || startup.batch === batchFilter;
      const matchesStatus = statusFilter === 'all' || startup.status === statusFilter;

      const passes = matchesSearch && matchesCategory && matchesFunding && matchesBatch && matchesStatus;
      
      if (!passes) {
        console.log('Startup filtered out:', startup.name, {
          matchesSearch, matchesCategory, matchesFunding, matchesBatch, matchesStatus,
          startup: { category: startup.category, funding_stage: startup.funding_stage, batch: startup.batch, status: startup.status }
        });
      }
      
      return passes;
    });
    
    console.log('Filtered result:', filtered.length, 'startups');
    return filtered;
  }, [startups, searchQuery, categoryFilter, fundingFilter, batchFilter, statusFilter]);

  const activeFiltersCount = [
    categoryFilter !== 'All Categories',
    fundingFilter !== 'All Stages',
    batchFilter !== 'All Batches',
    statusFilter !== 'all',
  ].filter(Boolean).length;

  const clearFilters = () => {
    setCategoryFilter('All Categories');
    setFundingFilter('All Stages');
    setBatchFilter('All Batches');
    setStatusFilter('all');
    setSearchQuery('');
  };

  const getFundingBadgeColor = (stage?: string) => {
    switch (stage) {
      case 'series-a':
      case 'series-b':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'seed':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      case 'pre-seed':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
      case 'bootstrapped':
        return 'bg-orange-100 text-orange-700 hover:bg-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'graduated':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      case 'alumni':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center"
          >
            <Badge className="bg-accent/20 text-white hover:bg-accent/30 border-0 text-sm px-4 py-2 mb-4">
              <Rocket className="w-4 h-4 mr-2" />
              {startups.length} Startups in Our Portfolio
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Our <span className="text-accent">Startup</span> Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 font-light">
              Discover innovative companies building the future
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-gray-50 border-b-2 border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Building2, label: `${startups.length} Startups`, color: 'text-accent' },
              { icon: TrendingUp, label: '₹50+ Cr Total Funding', color: 'text-accent' },
              { icon: Users, label: '200+ Founders', color: 'text-accent' },
              { icon: Award, label: '14 Categories', color: 'text-accent' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <span className="text-gray-700 font-semibold">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b-2 border-gray-200 sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-900">Filters</span>
                {activeFiltersCount > 0 && (
                  <Badge className="bg-accent text-white hover:bg-accent/90">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none text-sm"
                >
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>

                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none text-sm"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                {/* Funding Stage Filter */}
                <select
                  value={fundingFilter}
                  onChange={(e) => setFundingFilter(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none text-sm"
                >
                  {fundingStages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>

                {/* Batch Filter */}
                <select
                  value={batchFilter}
                  onChange={(e) => setBatchFilter(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none text-sm"
                >
                  {batches.map(batch => (
                    <option key={batch} value={batch}>{batch}</option>
                  ))}
                </select>

                {activeFiltersCount > 0 && (
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    size="sm"
                    className="border-2"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredStartups.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{startups.length}</span> startups
            </p>
          </div>
        </div>
      </section>

      {/* Startups Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {filteredStartups.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No startups found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                <Button onClick={clearFilters} className="bg-accent hover:bg-accent/90">
                  Clear All Filters
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStartups.map((startup, index) => (
                  <motion.div
                    key={startup.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card className="h-full border-2 border-gray-200 hover:border-accent/30 transition-all hover:shadow-xl group">
                      <CardContent className="p-6 flex flex-col h-full">
                        {/* Logo & Status */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center">
                            <Building2 className="w-8 h-8 text-accent" />
                          </div>
                          <Badge className={`${getStatusBadgeColor(startup.status)} border-0 text-xs`}>
                            {startup.status}
                          </Badge>
                        </div>

                        {/* Company Info */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors">
                          {startup.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 italic">
                          {startup.tagline}
                        </p>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                          {startup.description}
                        </p>

                        {/* Category Badge */}
                        <div className="mb-4">
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 text-xs">
                            {startup.category}
                          </Badge>
                        </div>

                        {/* Tags */}
                        {startup.tags && startup.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {startup.tags.slice(0, 3).map((tag: string) => (
                              <Badge key={tag} variant="outline" className="text-xs border-gray-300">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Meta Info */}
                        <div className="space-y-2 mb-4 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-accent" />
                            <span>Founded {startup.founded}</span>
                            {startup.batch && (
                              <>
                                <span>•</span>
                                <span>{startup.batch}</span>
                              </>
                            )}
                          </div>
                          {startup.teamSize && (
                            <div className="flex items-center gap-2">
                              <Users className="w-3 h-3 text-accent" />
                              <span>{startup.teamSize} team members</span>
                            </div>
                          )}
                          {startup.funding && (
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-3 h-3 text-accent" />
                              <span>{startup.funding} raised</span>
                              {startup.fundingStage && (
                                <Badge className={`${getFundingBadgeColor(startup.fundingStage)} border-0 text-xs px-2 py-0`}>
                                  {startup.fundingStage}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Achievements */}
                        {startup.achievements && startup.achievements.length > 0 && (
                          <div className="mb-4 pt-4 border-t border-gray-200">
                            <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-accent" />
                              Key Achievements
                            </p>
                            <ul className="space-y-1">
                              {startup.achievements.slice(0, 2).map((achievement: string, i: number) => (
                                <li key={i} className="text-xs text-gray-600 flex items-start">
                                  <Target className="w-3 h-3 text-accent mr-1 mt-0.5 flex-shrink-0" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-auto">
                          <Button
                            asChild
                            className="flex-1 bg-primary hover:bg-primary/90"
                            size="sm"
                          >
                            <Link href={`/startups/${startup.id}`}>
                              Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                          {startup.website && (
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                            >
                              <a href={startup.website} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Join Our Portfolio?
            </h2>
            <p className="text-xl text-white/90 mb-12">
              Apply now to become part of our thriving startup ecosystem
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 text-base px-8 h-14">
                <Link href="/apply">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-base px-8 h-14">
                <Link href="/programs">
                  View Programs
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
