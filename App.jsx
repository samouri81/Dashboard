import { useState, useEffect, useCallback } from 'react'
import './App.css'
import reachLabsLogo from './assets/reach-labs-logo.png'

// Complete checklist data structure
const checklistData = {
  digitalMarketing: {
    title: 'Digital Marketing Channels',
    icon: '📱',
    items: [
      {
        id: 1,
        text: 'Campaign architecture properly structured for each objective',
        bestPractice: '3-tier structure (Campaign → Ad Set → Ad) with clear objective alignment. Limit ad sets to 2-4 per campaign for optimal learning phase completion.'
      },
      {
        id: 2,
        text: 'Sufficient conversion volume per ad set (50+ per week)',
        bestPractice: 'Meta benchmark: 50 conversions per ad set per week for algorithm optimization. Scale or consolidate ad sets below this threshold.'
      },
      {
        id: 3,
        text: 'Creative refresh cycle appropriate to prevent fatigue',
        bestPractice: 'Maintain 3-6 active creatives per ad set. Refresh cycle: 4-6 weeks for top performers. Monitor frequency and CTR decline.'
      },
      {
        id: 4,
        text: 'Audiences properly segmented and sized for each campaign objective',
        bestPractice: 'Audience sizes: 1-5M for prospecting (larger for awareness, smaller for conversion). Use 1% lookalikes for acquisition, 1-5% for scaling.'
      },
      {
        id: 5,
        text: 'Budget allocation efficient between proven and experimental campaigns',
        bestPractice: '70/20/10 budget framework: 70% to proven performers, 20% to scaling tests, 10% to experimental campaigns.'
      },
      {
        id: 6,
        text: 'Bidding strategies optimized for each objective and audience',
        bestPractice: 'Use CBO for campaigns with 3+ ad sets. Implement automated bidding for mature campaigns, manual for testing phases.'
      },
      {
        id: 7,
        text: 'Performance benchmarked against industry standards',
        bestPractice: 'Industry CTR benchmarks: 0.5-1.5% for Facebook, 0.8-2.0% for Instagram. CPC varies by industry ($0.50-$3.00).'
      },
      {
        id: 8,
        text: 'Audience exclusions implemented to prevent wasted spend',
        bestPractice: 'Exclude converters for minimum 30 days before re-entry to prospecting. Implement recency-based retargeting segments.'
      }
    ]
  },
  socialMedia: {
    title: 'Social Media Performance',
    icon: '📊',
    items: [
      {
        id: 9,
        text: 'Content mix ratios optimized for platform performance',
        bestPractice: '40/30/20/10 split for e-commerce: 40% product content, 30% educational, 20% behind-the-scenes, 10% user-generated content.'
      },
      {
        id: 10,
        text: 'Posting cadence aligned with platform best practices',
        bestPractice: 'Instagram: 1-2 posts/day, 3-5 stories/day. Facebook: 1 post/day. TikTok: 1-3 posts/day. LinkedIn: 1 post/day.'
      },
      {
        id: 11,
        text: 'Platform-native format utilization maximized',
        bestPractice: 'Instagram: 60% Reels, 25% carousel, 15% single image. TikTok: 100% vertical video. LinkedIn: 50% text, 30% image, 20% video.'
      },
      {
        id: 12,
        text: 'CTA effectiveness optimized for each platform',
        bestPractice: 'Platform-specific CTR benchmarks: Instagram 1.08%, Facebook 0.90%, TikTok 1.0%, LinkedIn 0.26%. Test CTA placement and copy.'
      },
      {
        id: 13,
        text: 'Engagement rate meets industry benchmarks',
        bestPractice: 'Industry engagement rates: Instagram 1.22%, Facebook 0.27%, TikTok 5.96%, LinkedIn 0.54%. Monitor weekly trends.'
      },
      {
        id: 14,
        text: 'Hashtag strategy optimized for reach and relevance',
        bestPractice: 'Instagram: 5-10 hashtags mix (3 niche, 4 medium, 3 broad). TikTok: 3-5 trending + niche hashtags. LinkedIn: 3-5 professional hashtags.'
      }
    ]
  },
  crmRetention: {
    title: 'CRM & Retention',
    icon: '💌',
    items: [
      {
        id: 15,
        text: 'Email open rates meet industry benchmarks',
        bestPractice: 'Industry benchmarks - Retail: 18.4%, E-commerce: 17.8%, SaaS: 22.1%. Segment by customer lifecycle stage.'
      },
      {
        id: 16,
        text: 'Retention curve shape indicates healthy customer lifecycle',
        bestPractice: 'Healthy retention: 80% month 1, 55% month 3, 35% month 6, 25% month 12. Identify inflection points for intervention.'
      },
      {
        id: 17,
        text: 'Win-back strategy effectiveness measured and optimized',
        bestPractice: 'Target customers 60-90 days post-last purchase. Win-back campaigns should achieve 15-25% reactivation rate.'
      },
      {
        id: 18,
        text: 'Loyalty program structure drives repeat purchases',
        bestPractice: 'Points-based: 1 point per $1 spent, 100 points = $5 reward. Tier-based: Bronze/Silver/Gold with increasing benefits.'
      },
      {
        id: 19,
        text: 'Customer lifetime value (CLV) tracked and optimized',
        bestPractice: 'CLV should be 3x customer acquisition cost (CAC). Track by cohort and segment. Benchmark: $50-$200 for e-commerce.'
      },
      {
        id: 20,
        text: 'Segmentation strategy based on behavior and value',
        bestPractice: 'RFM segmentation: Recency (0-365 days), Frequency (1-10+ orders), Monetary ($0-$1000+). Create 8-12 segments.'
      }
    ]
  },
  uxuiTechnical: {
    title: 'UX/UI & Technical',
    icon: '🎨',
    items: [
      {
        id: 21,
        text: 'Page load speed optimized for conversion',
        bestPractice: 'Target: <3 seconds desktop, <2 seconds mobile. Every 1-second delay reduces conversions by 7%. Use Google PageSpeed Insights.'
      },
      {
        id: 22,
        text: 'Mobile responsiveness ensures optimal user experience',
        bestPractice: 'Mobile-first design. 60%+ traffic is mobile. Test on multiple devices. Thumb-friendly navigation and CTA placement.'
      },
      {
        id: 23,
        text: 'Checkout process minimizes friction and abandonment',
        bestPractice: 'Single-page checkout preferred. Guest checkout option. Progress indicators. Multiple payment methods. Trust badges.'
      },
      {
        id: 24,
        text: 'Product page optimization drives conversions',
        bestPractice: 'High-quality images (5-8 per product), detailed descriptions, reviews, size guides, related products, clear CTAs.'
      },
      {
        id: 25,
        text: 'Navigation structure intuitive and conversion-focused',
        bestPractice: 'Max 3-click rule to any product. Clear category hierarchy. Search functionality. Breadcrumbs. Sticky navigation.'
      },
      {
        id: 26,
        text: 'Trust signals prominently displayed throughout site',
        bestPractice: 'SSL certificates, security badges, customer reviews, testimonials, return policy, contact information, social proof.'
      }
    ]
  },
  analyticsKpis: {
    title: 'Analytics & KPIs',
    icon: '📈',
    items: [
      {
        id: 27,
        text: 'Campaign objectives aligned with chosen KPIs',
        bestPractice: 'Awareness: CPM, Reach, Impressions. Consideration: CTR, CPC, Video Views. Conversion: CPA, ROAS, CVR.'
      },
      {
        id: 28,
        text: 'Attribution logic health assessed and optimized',
        bestPractice: 'Multi-touch attribution preferred. 7-day click, 1-day view window for Facebook. First-party data integration.'
      },
      {
        id: 29,
        text: 'Funnel stage measurement aligned with business goals',
        bestPractice: 'Awareness → Interest → Consideration → Purchase → Retention. Track conversion rates between each stage.'
      },
      {
        id: 30,
        text: 'Return on ad spend (ROAS) meets profitability targets',
        bestPractice: 'Minimum ROAS targets: 3:1 for new customers, 4:1 for existing customers, 5:1 for mature campaigns.'
      },
      {
        id: 31,
        text: 'Customer acquisition cost (CAC) sustainable long-term',
        bestPractice: 'CAC should be <30% of customer lifetime value. Benchmark: $10-$50 for e-commerce, varies by industry.'
      },
      {
        id: 32,
        text: 'Data quality and tracking implementation verified',
        bestPractice: 'Google Analytics 4, Facebook Pixel, server-side tracking. Regular audits for data accuracy and completeness.'
      }
    ]
  },
  competitorBenchmarking: {
    title: 'Competitor Benchmarking',
    icon: '🔍',
    items: [
      {
        id: 33,
        text: 'Competitive landscape analysis completed',
        bestPractice: 'Identify 5-10 direct competitors. Analyze market share, positioning, pricing, and unique value propositions.'
      },
      {
        id: 34,
        text: 'Competitor advertising strategies analyzed',
        bestPractice: 'Use Facebook Ad Library, SEMrush, or similar tools. Analyze ad copy, creative formats, targeting, and frequency.'
      },
      {
        id: 35,
        text: 'Pricing strategy competitive and value-driven',
        bestPractice: 'Price within 10-15% of competitors for similar products. Justify premium pricing with clear value differentiation.'
      },
      {
        id: 36,
        text: 'Content strategy differentiated from competitors',
        bestPractice: 'Unique brand voice, original content formats, different platform focus, or underserved audience segments.'
      },
      {
        id: 37,
        text: 'Market positioning clearly differentiated',
        bestPractice: 'Clear unique selling proposition (USP). Different target audience, price point, quality level, or service offering.'
      },
      {
        id: 38,
        text: 'Competitive advantages identified and leveraged',
        bestPractice: 'Product quality, customer service, pricing, distribution, technology, brand reputation, or market expertise.'
      }
    ]
  },
  strategicRecommendations: {
    title: 'Strategic Recommendations',
    icon: '🎯',
    items: [
      {
        id: 39,
        text: 'Quick wins identified for immediate implementation',
        bestPractice: 'Low-effort, high-impact changes: ad copy optimization, audience refinement, budget reallocation, creative refresh.'
      },
      {
        id: 40,
        text: 'Mid-term improvements planned with clear timelines',
        bestPractice: '3-6 month initiatives: new platform expansion, automation implementation, advanced targeting, loyalty program.'
      },
      {
        id: 41,
        text: 'Long-term strategic shifts aligned with business goals',
        bestPractice: '6-12 month initiatives: brand repositioning, new market entry, product line expansion, technology upgrades.'
      },
      {
        id: 42,
        text: 'Resource allocation optimized for maximum ROI',
        bestPractice: 'Budget allocation based on channel performance, team capacity, and strategic priorities. Regular review cycles.'
      },
      {
        id: 43,
        text: 'Success metrics defined for each recommendation',
        bestPractice: 'SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound. Clear KPIs and measurement methodology.'
      },
      {
        id: 44,
        text: 'Implementation roadmap with dependencies mapped',
        bestPractice: 'Gantt chart or similar. Identify prerequisites, resource requirements, potential risks, and contingency plans.'
      }
    ]
  }
}

function App() {
  const [selectedClient, setSelectedClient] = useState('')
  const [clients, setClients] = useState(['Demo Client', 'Acme Corp', 'TechStart Inc'])
  const [showAddClient, setShowAddClient] = useState(false)
  const [newClientName, setNewClientName] = useState('')
  const [activeTab, setActiveTab] = useState('digitalMarketing')
  const [checkedItems, setCheckedItems] = useState({})
  const [flaggedItems, setFlaggedItems] = useState({})
  const [notes, setNotes] = useState({})
  const [sectionNotes, setSectionNotes] = useState({})
  const [lastSaved, setLastSaved] = useState(null)
  const [saveStatus, setSaveStatus] = useState('saved')

  // Auto-save functionality
  const saveData = useCallback(() => {
    if (selectedClient) {
      const auditData = {
        checkedItems,
        flaggedItems,
        notes,
        sectionNotes,
        lastModified: new Date().toISOString()
      }
      localStorage.setItem(`audit_${selectedClient}`, JSON.stringify(auditData))
      setLastSaved(new Date())
      setSaveStatus('saved')
    }
  }, [selectedClient, checkedItems, flaggedItems, notes, sectionNotes])

  // Load data when client changes
  useEffect(() => {
    if (selectedClient) {
      const savedData = localStorage.getItem(`audit_${selectedClient}`)
      if (savedData) {
        const parsed = JSON.parse(savedData)
        setCheckedItems(parsed.checkedItems || {})
        setFlaggedItems(parsed.flaggedItems || {})
        setNotes(parsed.notes || {})
        setSectionNotes(parsed.sectionNotes || {})
        setLastSaved(new Date(parsed.lastModified))
      } else {
        setCheckedItems({})
        setFlaggedItems({})
        setNotes({})
        setSectionNotes({})
        setLastSaved(null)
      }
    }
  }, [selectedClient])

  // Auto-save every 2 seconds when data changes
  useEffect(() => {
    setSaveStatus('saving')
    const timer = setTimeout(() => {
      saveData()
    }, 2000)
    return () => clearTimeout(timer)
  }, [checkedItems, flaggedItems, notes, sectionNotes, saveData])

  const handleAddClient = () => {
    if (newClientName.trim() && !clients.includes(newClientName.trim())) {
      const newClients = [...clients, newClientName.trim()]
      setClients(newClients)
      localStorage.setItem('clients', JSON.stringify(newClients))
      setSelectedClient(newClientName.trim())
      setNewClientName('')
      setShowAddClient(false)
    }
  }

  const handleCheckboxChange = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const handleFlagChange = (itemId, flagType) => {
    setFlaggedItems(prev => ({
      ...prev,
      [itemId]: prev[itemId] === flagType ? null : flagType
    }))
  }

  const handleNotesChange = (itemId, value) => {
    setNotes(prev => ({
      ...prev,
      [itemId]: value
    }))
  }

  const handleSectionNotesChange = (sectionKey, value) => {
    setSectionNotes(prev => ({
      ...prev,
      [sectionKey]: value
    }))
  }

  const calculateProgress = () => {
    const totalItems = Object.values(checklistData).reduce((sum, section) => sum + section.items.length, 0)
    const completedItems = Object.values(checkedItems).filter(Boolean).length
    return { completed: completedItems, total: totalItems, percentage: Math.round((completedItems / totalItems) * 100) }
  }

  const exportToPDF = () => {
    const progress = calculateProgress()
    const currentDate = new Date().toLocaleDateString()
    
    const auditSummary = Object.entries(checklistData).map(([key, section]) => {
      const sectionItems = section.items.map(item => ({
        ...item,
        completed: checkedItems[item.id] || false,
        flag: flaggedItems[item.id] || null,
        notes: notes[item.id] || ''
      }))
      
      const completed = sectionItems.filter(item => item.completed).length
      const critical = sectionItems.filter(item => item.flag === 'critical').length
      const needsWork = sectionItems.filter(item => item.flag === 'needs-work').length
      
      return {
        title: section.title,
        icon: section.icon,
        items: sectionItems,
        summary: {
          completed,
          total: sectionItems.length,
          percentage: Math.round((completed / sectionItems.length) * 100),
          critical,
          needsWork
        },
        sectionNotes: sectionNotes[key] || ''
      }
    })

    const pdfContent = `
REACH LABS MARKETING AUDIT REPORT

Client: ${selectedClient}
Date: ${currentDate}
Overall Progress: ${progress.completed}/${progress.total} items (${progress.percentage}%)

${auditSummary.map(section => `
${section.icon} ${section.title.toUpperCase()}
Progress: ${section.summary.completed}/${section.summary.total} (${section.summary.percentage}%)
Critical Issues: ${section.summary.critical}
Needs Work: ${section.summary.needsWork}

${section.items.map(item => `
${item.completed ? '✓' : '○'} ${item.text}
${item.flag ? `[${item.flag.toUpperCase()}]` : ''}
${item.notes ? `Notes: ${item.notes}` : ''}
`).join('')}

Section Summary: ${section.sectionNotes || 'No additional notes'}
`).join('\n')}

Generated by REACH LABS Marketing Dashboard
    `

    const blob = new Blob([pdfContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedClient}_Marketing_Audit_${currentDate.replace(/\//g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!selectedClient) {
    return (
      <div className="dashboard-container">
        <div className="hero-section">
          <h1 className="hero-title">
            <span className="gradient-text">REACH LABS</span>
          </h1>
          <h2 className="hero-subtitle">Marketing Dashboard</h2>
          <p className="hero-description">
            Performance marketing that delivers measurable growth for Kuwait's leading e-commerce brands
          </p>
        </div>
        
        <div className="client-selection">
          <div className="clean-card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>
              Select Client
            </h3>
            
            {!showAddClient ? (
              <>
                <div className="client-list">
                  {clients.map(client => (
                    <button
                      key={client}
                      onClick={() => setSelectedClient(client)}
                      className="client-button"
                    >
                      <span>{client}</span>
                      <span style={{ color: 'var(--cyan)' }}>→</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowAddClient(true)}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  + Add New Client
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="text"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="Enter client name"
                  className="form-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddClient()}
                  autoFocus
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={handleAddClient} className="btn-primary">
                    Add Client
                  </button>
                  <button
                    onClick={() => {
                      setShowAddClient(false)
                      setNewClientName('')
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const progress = calculateProgress()
  const currentSection = checklistData[activeTab]

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <h1 className="logo-text gradient-text">REACH LABS</h1>
          <div>
            <div className="header-subtitle">Marketing Dashboard</div>
          </div>
        </div>
        
        <div className="header-actions">
          <div className="save-status">
            <div className={`save-dot ${saveStatus}`}></div>
            <span className="save-text">
              {saveStatus === 'saved' ? 'Saved' : 'Saving...'}
              {lastSaved && ` • ${lastSaved.toLocaleTimeString()}`}
            </span>
          </div>
          
          <button onClick={exportToPDF} className="btn-primary">
            📄 Export Report
          </button>
          <button onClick={() => setSelectedClient('')} className="btn-secondary">
            Change Client
          </button>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-info">
          <h2>
            Audit for <span className="gradient-text">{selectedClient}</span>
          </h2>
          <p style={{ color: 'var(--gray-medium)' }}>Comprehensive marketing audit and strategic review</p>
        </div>
        <div className="progress-stats">
          <div className="progress-number">{progress.percentage}%</div>
          <div className="progress-label">Complete</div>
          <div style={{ color: 'var(--gray-medium)', fontSize: '0.875rem' }}>
            {progress.completed} of {progress.total} items
          </div>
        </div>
      </div>

      <div className="tabs-container">
        {Object.entries(checklistData).map(([key, section]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`tab-button ${activeTab === key ? 'active' : ''}`}
          >
            <span>{section.icon}</span>
            <span>{section.title}</span>
          </button>
        ))}
      </div>

      <div className="audit-section">
        <div className="section-header">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{currentSection.icon}</div>
          <h3 className="section-title">{currentSection.title}</h3>
          <div className="section-underline"></div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
          {currentSection.items.map(item => (
            <div key={item.id} className="audit-item">
              <div className="item-header">
                <button
                  onClick={() => handleCheckboxChange(item.id)}
                  className={`checkbox ${checkedItems[item.id] ? 'checked' : ''}`}
                >
                  {checkedItems[item.id] && '✓'}
                </button>
                
                <div className="item-text">
                  {item.text}
                </div>
                
                <div className="item-actions">
                  <button
                    onClick={() => handleFlagChange(item.id, 'critical')}
                    className={`flag-btn critical ${flaggedItems[item.id] === 'critical' ? 'active' : ''}`}
                  >
                    ⚠ Critical
                  </button>
                  <button
                    onClick={() => handleFlagChange(item.id, 'needs-work')}
                    className={`flag-btn warning ${flaggedItems[item.id] === 'needs-work' ? 'active' : ''}`}
                  >
                    ⚡ Needs Work
                  </button>
                </div>
              </div>

              <div className="benchmark-section">
                <div className="benchmark-header">
                  📊 Industry Benchmark
                </div>
                <div className="benchmark-text">{item.bestPractice}</div>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <div className="notes-label">
                  📝 Add notes or observations...
                </div>
                <textarea
                  value={notes[item.id] || ''}
                  onChange={(e) => handleNotesChange(item.id, e.target.value)}
                  placeholder="Add your specific observations, findings, or recommendations for this item..."
                  className="form-textarea"
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="clean-card">
          <div className="benchmark-header" style={{ marginBottom: '1rem' }}>
            📋 Section Summary Notes
          </div>
          <textarea
            value={sectionNotes[activeTab] || ''}
            onChange={(e) => handleSectionNotesChange(activeTab, e.target.value)}
            placeholder="Add overall observations and recommendations for this section..."
            className="form-textarea"
            rows={4}
          />
        </div>
      </div>
    </div>
  )
}

export default App

