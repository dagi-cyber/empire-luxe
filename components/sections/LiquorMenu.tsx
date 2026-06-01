'use client'
import { useState, useEffect } from 'react'
import { sanityClient, urlFor } from '@/lib/sanity'
import Image from 'next/image'

const TABS = [
  { key: 'cocktails', label: 'COCKTAILS' },
  { key: 'whiskey',   label: 'WHISKEY'   },
  { key: 'vodka',     label: 'VODKA'     },
  { key: 'gin',       label: 'GIN'       },
  { key: 'rum',       label: 'RUM'       },
  { key: 'tequila',   label: 'TEQUILA'   },
  { key: 'champagne', label: 'CHAMPAGNE' },
  { key: 'beer',      label: 'BEER'      },
]

const ICONS: Record<string, string> = {
  cocktails: '🍸', whiskey: '🥃', vodka: '🍹',
  gin: '🌿', rum: '🍹', tequila: '🌵',
  champagne: '🥂', beer: '🍺',
}

const FALLBACK: Record<string, any[]> = {
  cocktails: [
    { _id:'c1', name:'Empire Old Fashioned', description:'Bourbon, vanilla, and a hint of smoke',        tags:['BOURBON','VANILLA','BITTERS'],    price:18 },
    { _id:'c2', name:'Royal Blossom',        description:'Gin, elderflower, and fresh lemon',            tags:['GIN','ELDERFLOWER','LEMON'],       price:17 },
    { _id:'c3', name:'Luxe Mojito',          description:'White rum, lime, mint, and luxury',            tags:['RUM','LIME','MINT'],               price:16 },
    { _id:'c4', name:'Midnight Espresso',    description:'Vodka, espresso, coffee liqueur, dark cocoa',  tags:['VODKA','ESPRESSO','COCOA'],        price:17 },
    { _id:'c5', name:'Purple Reign',         description:'Vodka, blue curaçao, lemon — signature Empire',tags:['VODKA','BLUE CURAÇAO','LEMON'],    price:19 },
    { _id:'c6', name:'Gold Rush Sour',       description:'Bourbon, honey syrup, fresh lemon',            tags:['BOURBON','HONEY','LEMON'],         price:18 },
  ],
  whiskey: [
    { _id:'w1', name:'Macallan 12',     description:'Single malt Scotch, smooth and sherried',      tags:['SCOTCH','SINGLE MALT'], price:22 },
    { _id:'w2', name:"Maker's Mark",    description:'Kentucky straight bourbon, soft and mellow',   tags:['BOURBON','KENTUCKY'],   price:14 },
    { _id:'w3', name:'Jameson Black',   description:'Triple-distilled Irish whiskey, extra smooth', tags:['IRISH','BLENDED'],      price:12 },
    { _id:'w4', name:'Woodford Reserve',description:'Premium Kentucky bourbon, vanilla and oak',    tags:['BOURBON','PREMIUM'],    price:16 },
  ],
  vodka: [
    { _id:'v1', name:'Grey Goose', description:'French premium vodka, ultra-smooth', tags:['FRENCH','PREMIUM'],   price:16 },
    { _id:'v2', name:'Belvedere', description:'Polish rye vodka, clean and crisp',   tags:['POLISH','PURE RYE'],  price:14 },
    { _id:'v3', name:'Ciroc',     description:'French grape vodka, fruity and smooth',tags:['GRAPE','FRENCH'],    price:15 },
  ],
  gin: [
    { _id:'g1', name:'Hendricks',       description:'Scottish gin with cucumber and rose',    tags:['SCOTTISH','FLORAL'],    price:14 },
    { _id:'g2', name:'Tanqueray No.Ten',description:'London dry gin, fresh citrus heart',     tags:['LONDON DRY','CITRUS'],  price:15 },
  ],
  rum: [
    { _id:'r1', name:'Diplomatico', description:'Venezuelan dark rum, rich and complex', tags:['VENEZUELAN','DARK'], price:14 },
    { _id:'r2', name:'Bacardi 8',   description:'Aged golden rum, vanilla and oak',      tags:['CUBAN','AGED'],      price:12 },
  ],
  tequila: [
    { _id:'t1', name:'Don Julio 1942', description:'Ultra-premium añejo, smooth and luxurious', tags:['AÑEJO','PREMIUM'],    price:24 },
    { _id:'t2', name:'Patrón Silver',  description:'100% blue agave blanco, clean and crisp',   tags:['BLANCO','BLUE AGAVE'],price:16 },
  ],
  champagne: [
    { _id:'ch1', name:"Moët & Chandon", description:'Classic Champagne, fresh and elegant',    tags:['BRUT','CHAMPAGNE'],   price:22 },
    { _id:'ch2', name:'Veuve Clicquot', description:'Rich yellow label, full-bodied and toasty',tags:['BRUT','REIMS'],      price:25 },
    { _id:'ch3', name:'Dom Pérignon',   description:'Prestige cuvée, complex and refined',      tags:['VINTAGE','PRESTIGE'], price:120 },
  ],
  beer: [
    { _id:'b1', name:'Heineken',        description:'Dutch lager, refreshing and crisp',   tags:['LAGER','DUTCH'],        price:8  },
    { _id:'b2', name:'Corona Extra',    description:'Mexican pale lager, light and smooth', tags:['PALE LAGER','MEXICAN'], price:8  },
    { _id:'b3', name:'Guinness Draught',description:'Irish stout, creamy and rich',         tags:['STOUT','IRISH'],        price:10 },
  ],
}

export default function LiquorMenu() {
  const [activeTab,  setActiveTab]  = useState('cocktails')
  const [allItems,   setAllItems]   = useState<any[]>([])
  const [loading,    setLoading]    = useState(true)

  // Fetch ALL items once on mount
  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "liquorItem" && available == true] | order(name asc) {
        _id, name, description, price, category, tags, image
      }`)
      .then((data) => {
        setAllItems(data || [])
        setLoading(false)
      })
      .catch(() => {
        setAllItems([])
        setLoading(false)
      })
  }, [])

  // Filter by active tab
  const sanityItems = allItems.filter((i) => i.category === activeTab)

  // Use Sanity if has data, else fallback
  const items = sanityItems.length > 0
    ? sanityItems
    : (FALLBACK[activeTab] || [])

  return (
    <section
      id="liquor"
      className="section-pad"
      style={{ background: 'var(--dark)' }}
    >
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="section-tag">THE FINEST POUR. THE BOLDEST FLAVOR.</span>
          <h2 className="section-title">
            Our <em>Liquor</em>
          </h2>
        </div>

        {/* Tabs */}
        <div style={{
          display:      'flex',
          borderBottom: '1px solid rgba(201,168,76,0.18)',
          flexWrap:     'wrap',
          marginBottom: '2rem',
          gap:          '0',
        }}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding:       '0.7rem 1.3rem',
                background:    'transparent',
                border:        'none',
                borderBottom:  activeTab === tab.key
                  ? '2px solid var(--gold)'
                  : '2px solid transparent',
                marginBottom:  '-1px',
                fontFamily:    'Josefin Sans, sans-serif',
                fontSize:      '0.56rem',
                letterSpacing: '0.18em',
                color:         activeTab === tab.key ? 'var(--gold)' : 'var(--muted)',
                cursor:        'pointer',
                transition:    'all 0.3s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Layout — items + sidebar */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 190px',
          gap:                 '2.5rem',
          alignItems:          'start',
        }} className="menu-layout">

          {/* Items grid */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 '0',
          }} className="items-grid">
            {loading ? (
              // Loading skeleton
              [1,2,3,4].map((i) => (
                <div key={i} style={{
                  height: '90px', padding: '1.2rem 0',
                  borderBottom: '1px solid rgba(201,168,76,0.09)',
                  opacity: 0.4,
                  background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.05), transparent)',
                }} />
              ))
            ) : (
              items.map((item: any) => (
                <div
                  key={item._id}
                  style={{
                    display:       'flex',
                    alignItems:    'flex-start',
                    gap:           '0.9rem',
                    padding:       '1.2rem 0',
                    borderBottom:  '1px solid rgba(201,168,76,0.09)',
                    transition:    'padding 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.paddingLeft = '0.5rem'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.paddingLeft = '0'
                  }}
                >
                  {/* Image or emoji */}
                  <div style={{
                    width:          '60px',
                    height:         '60px',
                    background:     'var(--card)',
                    border:         '1px solid rgba(201,168,76,0.18)',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    fontSize:       '1.5rem',
                    flexShrink:     0,
                    overflow:       'hidden',
                    position:       'relative',
                  }}>
                    {item.image ? (
                      <Image
                        src={urlFor(item.image).width(60).height(60).url()}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      ICONS[activeTab]
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="font-cormorant" style={{
                      fontSize: '1.05rem', marginBottom: '0.25rem',
                    }}>
                      {item.name}
                    </div>
                    <div style={{
                      fontSize: '0.56rem', color: 'var(--muted)',
                      lineHeight: 1.7, marginBottom: '0.3rem',
                    }}>
                      {item.description}
                    </div>
                    {item.tags && (
                      <div style={{
                        fontSize: '0.46rem', color: 'var(--gold-dim)',
                        letterSpacing: '0.08em',
                      }}>
                        {Array.isArray(item.tags)
                          ? item.tags.join(' · ')
                          : item.tags}
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="font-cormorant" style={{
                    fontSize: '1.1rem', color: 'var(--gold)', flexShrink: 0,
                  }}>
                    ${item.price}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Happy Hour */}
            <div style={{
              border:     '1px solid rgba(201,168,76,0.22)',
              padding:    '1.3rem',
              background: 'var(--card)',
            }}>
              <span style={{
                display:       'block',
                fontSize:      '0.52rem',
                letterSpacing: '0.28em',
                color:         'var(--gold)',
                marginBottom:  '0.8rem',
              }}>
                HAPPY HOUR
              </span>
              <div style={{
                fontSize:      '0.6rem',
                color:         'var(--muted)',
                letterSpacing: '0.12em',
                marginBottom:  '0.5rem',
              }}>
                5PM — 8PM
              </div>
              <div style={{
                height:     '1px',
                background: 'rgba(201,168,76,0.18)',
                margin:     '0.8rem 0',
              }} />
              <div style={{ fontSize: '0.58rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>
                Selected cocktails from
              </div>
              <div className="font-cormorant" style={{
                fontSize: '2.2rem', color: 'var(--gold)',
              }}>
                $10
              </div>
            </div>

            {/* Bottle Service */}
            <div style={{
              padding:     '1.3rem',
              border:      '1px solid rgba(159,94,255,0.3)',
              background:  'rgba(123,47,190,0.06)',
            }}>
              <span style={{
                display:       'block',
                fontSize:      '0.52rem',
                letterSpacing: '0.28em',
                color:         'var(--purple-neon)',
                marginBottom:  '0.6rem',
              }}>
                BOTTLE SERVICE
              </span>
              <p style={{
                fontSize:   '0.6rem',
                color:      'var(--muted)',
                lineHeight: 1.8,
                marginBottom:'0.8rem',
              }}>
                Premium packages for your VIP table.
              </p>
              <a
                href="#reservation"
                style={{
                  fontSize:       '0.56rem',
                  letterSpacing:  '0.15em',
                  color:          'var(--gold)',
                  textDecoration: 'none',
                }}
              >
                VIEW PACKAGES →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .menu-layout  { grid-template-columns: 1fr !important; }
          .items-grid   { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
