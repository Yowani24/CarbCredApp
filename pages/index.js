import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

// ===============SPLIDEJS===============
import { Splide, SplideSlide } from 'splide-nextjs/react-splide';
import 'splide-nextjs/splide/dist/css/themes/splide-default.min.css';


import { CardList } from './productList/CardList'
import { useContext } from 'react';

export default function Home() {
  const { Card, onAdd, cartItems } = useContext(CardList);
  const [cardDetails,setCardDetails] = Card;
  return (
    <div className={styles.container}>
      <Head>
        <title>CarbCred App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>CarbCred</h1>
      </header>

      <div className={styles.country_selection}>Select a country <span>to get the footprint average</span></div>

      <section className={styles.card_sec}>
        <div className={styles.card_box}>
       
        <Splide
          options={{
            type: 'loop',
            gap: '1rem',
            perPage: 3,
            focus: 'center',
            pagination: false,

            breakpoints:{
              420: {
                perPage: 1,
                arrows:false,
                gap: '1rem',
                padding: {
                  left: '3.2rem',
                  right: '3rem',
                },
              },
              785: {
                arrows:false,
                pagination: true,
              }
            }
          }}
        >

          {cardDetails.map(item =>(
            <SplideSlide key={item.id}>
              <div className={styles.card}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <div>
                  <button onClick={() => onAdd(item)}>Add</button>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
        </div>
      </section>

      <section className={styles.button_box}>
        <Link href="/cart">
          <button>Continue</button>
        </Link>
      </section>
    </div>
  )
}
