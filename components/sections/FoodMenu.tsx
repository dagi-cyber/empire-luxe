'use client'
import { useState, useEffect } from 'react'
import { sanityClient, urlFor } from '@/lib/sanity'
import Image from 'next/image'

const TABS = [
  { key: 'appetizers', label: 'APPETIZERS'    },
  { key: 'mains',      label: 'MAINS'         },
  { key: 'burgers',    label: 'BURGERS'       },
  { key: 'desserts',   label: 'DESSERTS'      },
  { key: 'sharing',    label: 'SHARING PLATES'},
]

const FALLBACK: Record<string, any[]> = {
  appetizers: [
    { _id:'a1', name:'Truffle Fries',       description:'Crispy fries tossed in truffle oil, parmesan, and herbs.',              price:12, icon:'🍟' },
    { _id:'a2', name:'Spicy Tuna Tartare',  description:'Fresh tuna, avocado, sriracha mayo, crispy wontons.',                   price:18, icon:'🐟' },
    { _id:'a3', name:'Empire Sliders',      description:'Wagyu beef, smoked cheddar, house sauce.',                              price:16, icon:'🍔' },
    { _id:'a4', name:'Grilled Lamb Chops',  description:'Marinated to perfection. Garlic mashed and rosemary jus.',             price:28, icon:'🥩' },
    { _id:'a5', name:'Prawn Tempura',       description:'Crispy tiger prawns, yuzu mayo dipping sauce.',                        price:22, icon:'🦐' },
  ],
  mains: [
    { _id:'m1', name:'Wagyu Striploin 200g',description:'Premium wagyu, truffle butter, roasted vegetables.',                   price:65, icon:'🥩' },
    { _id:'m2', name:'Pan-Seared Sea Bass', description:'Lemon beurre blanc, asparagus, capers.',                               price:38, icon:'🐡' },
    { _id:'m3', name:'Black Truffle Pasta', description:'Handmade tagliatelle, black truffle, parmesan cream.',                 price:34, icon:'🍝' },
  ],
  burgers: [
    { _id:'bu1', name:'Empire Smash Burger',description:'Double smash patty, American cheese, pickles, special sauce.',         price:22, icon:'🍔' },
    { _id:'bu2', name:'Wagyu Royale',       description:'Wagyu patty, foie gras, caramelized onion, brioche.',                  price:38, icon:'🍔' },
    { _id:'bu3', name:'Impossible Luxe',    description:'Plant-based patty, avocado, chipotle aioli.',                          price:20, icon:'🌱' },
  ],
  desserts: [
    { _id:'d1', name:'Chocolate Lava Cake', description:'Warm chocolate cake, molten center, vanilla ice cream.',               price:12, icon:'🍫' },
    { _id:'d2', name:'Strawberry Panna Cotta',description:'Silky panna cotta, fresh strawberry coulis.',                       price:11, icon:'🍓' },
    { _id:'d3', name:'Artisan Ice Cream',   description:'Three scoops of our signature flavors.',                               price:9,  icon:'🍦' },
  ],
  sharing: [
    { _id:'s1', name:'Empire Sharing Board',description:'Charcuterie, artisan cheeses, olives, crackers.',                     price:45, icon:'🍽️' },
    { _id:'s2', name:'Seafood Platter',     description:'Lobster, prawns, oysters, king crab — on ice.',                       price:120,icon:'🦞' },
    { _id:'s3', name:'Mixed Grill Platter', description:'Wagyu skewers, lamb chops, chicken wings, sauces.',                   price:85, icon:'🔥' },
  ],
}

export default function FoodMenu() {
  const [activeTab, setActiveTab] = useState('appetizers')
  const [allItems,  setAllItems]  = useState<any[]>([])
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "foodItem" && available == true] | order(name asc) {
        _id, name, description, price, category,
        isChefSpecial, isLateNight, image
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

  const sanityItems = allItems.filter((i) => i.category === activeTab)
  const items = sanityItems.length > 0
    ? sanityItems
    : (FALLBACK[activeTab] || [])

  // Chef specials and late night from Sanity
  const chefSpecials = allItems.filter((i) => i.isChefSpecial)
  const lateNight    = allItems.filter((i) => i.isLateNight)

  return (
    <section
      id="food"
      className="section-pad"
      style={{ background: 'var(--black)' }}
    >
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="section-tag">BOLD FLAVORS. PERFECT BITES.</span>
          <h2 className="section-title">
            Our <em>Food</em>
          </h2>
        </div>

        {/* Tabs */}
        <div style={{
          display:      'flex',
          borderBottom: '1px solid rgba(201,168,76,0.18)',
          flexWrap:     'wrap',
          marginBottom: '2rem',
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
                letterSpacing: '0.15em',
                color:         activeTab === tab.key ? 'var(--gold)' : 'var(--muted)',
                cursor:        'pointer',
                transition:    'all 0.3s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Layout */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 210px',
          gap:                 '2.5rem',
          alignItems:          'start',
        }} className="food-layout">

          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {loading ? (
              [1,2,3].map((i) => (
                <div key={i} style={{
                  height: '85px', background: 'var(--card)',
                  border: '1px solid rgba(201,168,76,0.1)', opacity: 0.4,
                }} />
              ))
            ) : (
              items.map((item: any) => (
                <div
                  key={item._id}
                  style={{
                    display:    'flex',
                    alignItems: 'center',
                    gap:        '1rem',
                    padding:    '1rem 1.1rem',
                    background: 'var(--card)',
                    border:     '1px solid rgba(201,168,76,0.15)',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.15)'
                  }}
                >
                  {/* Image or emoji */}
                  <div style={{
                    width:          '70px',
                    height:         '70px',
                    background:     'var(--dark)',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    fontSize:       '2rem',
                    flexShrink:     0,
                    position:       'relative',
                    overflow:       'hidden',
                  }}>
                    {item.image ? (
                      <Image
                        src={urlFor(item.image).width(70).height(70).url()}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      item.icon || '🍽️'
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="font-cormorant" style={{ fontSize: '1.15rem' }}>
                        {item.name}
                      </div>
                      {item.isChefSpecial && (
                        <span style={{
                          fontSize:      '0.45rem',
                          letterSpacing: '0.15em',
                          color:         '#0D0810',
                          background:    'var(--gold)',
                          padding:       '0.15rem 0.5rem',
                        }}>
                          CHEF'S SPECIAL
                        </span>
                      )}
                      {item.isLateNight && (
                        <span style={{
                          fontSize:      '0.45rem',
                          letterSpacing: '0.15em',
                          color:         'var(--purple-neon)',
                          border:        '1px solid var(--purple-neon)',
                          padding:       '0.15rem 0.5rem',
                        }}>
                          LATE NIGHT
                        </span>
                      )}
                    </div>
                    <div style={{
                      fontSize:   '0.62rem',
                      color:      'var(--muted)',
                      lineHeight: 1.7,
                      marginTop:  '0.2rem',
                    }}>
                      {item.description}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="font-cormorant" style={{
                    fontSize:  '1.3rem',
                    color:     'var(--gold)',
                    flexShrink:0,
                  }}>
                    ${item.price}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Chef's Special */}
            <div style={{
              border:     '1px solid rgba(201,168,76,0.3)',
              padding:    '1.3rem',
              background: 'rgba(201,168,76,0.05)',
              textAlign:  'center',
            }}>
              <span style={{
                display:       'block',
                fontSize:      '0.52rem',
                letterSpacing: '0.28em',
                color:         'var(--gold)',
                marginBottom:  '0.6rem',
              }}>
                CHEF'S SPECIAL
              </span>
              {chefSpecials.length > 0 ? (
                chefSpecials.map((item) => (
                  <div key={item._id}>
                    <div className="font-cormorant" style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.58rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                      {item.description}
                    </div>
                    <div className="font-cormorant" style={{ fontSize: '1.3rem', color: 'var(--gold)', marginTop: '0.5rem' }}>
                      ${item.price}
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="font-cormorant" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                    Ask our staff
                  </div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                    Today's special creations using the freshest seasonal ingredients.
                  </div>
                </>
              )}
            </div>

            {/* Late Night Bites */}
            <div style={{
              border:     '1px solid rgba(159,94,255,0.25)',
              padding:    '1.3rem',
              background: 'rgba(123,47,190,0.06)',
              textAlign:  'center',
            }}>
              <span style={{
                display:       'block',
                fontSize:      '0.52rem',
                letterSpacing: '0.28em',
                color:         'var(--purple-neon)',
                marginBottom:  '0.5rem',
              }}>
                LATE NIGHT BITES
              </span>
              <div className="font-cormorant" style={{
                fontSize: '1.8rem', color: 'var(--purple-neon)',
              }}>
                11PM — 2AM
              </div>
              <div style={{
                fontSize:   '0.58rem',
                color:      'var(--muted)',
                marginTop:  '0.4rem',
                lineHeight: 1.7,
              }}>
                {lateNight.length > 0
                  ? `${lateNight.length} items available after midnight`
                  : 'Available after midnight'}
              </div>
            </div>

            {/* Reservation CTA */}
            <a
              href="#reservation"
              className="btn-gold"
              style={{
                textAlign:  'center',
                display:    'block',
                fontSize:   '0.6rem',
                padding:    '0.9rem',
              }}
            >
              BOOK A TABLE
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .food-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
