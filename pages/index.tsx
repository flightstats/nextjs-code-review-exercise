import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const submitForm = ({ target }) => {
    const {
      depapcode,
      depdate,
      deptime,
      arrapcode,
      arrdate,
      arrtime,
    } = target.elements

    fetch(`api/calculate-flight-time?depapcode=${depapcode.value}&depdate=${depdate.value}&deptime=${deptime.value}&arrapcode=${arrapcode.value}&arrdate=${arrdate.value}&arrtime=${arrtime.value}`)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData)
        setLoading(false)
      })
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <Head>
        <title>Flight Time Calculator</title>
      </Head>

      <main className={styles.main}>
        <iframe name="dummyframe" id="dummyframe" style={{display: 'none' }} />
        <form onSubmit={submitForm} target="dummyframe">
          <label htmlFor='depapcode'>Departure Airport Code:</label>
          <input type='text' id='depapcode' name='depapcode'/><br/>
          <label htmlFor='depdate'>Departure Date:</label>
          <input type='date' id='depdate' name='depdate'/><br/>
          <label htmlFor='deptime'>Departure Time (Local):</label>
          <input type='time' id='deptime' name='deptime'/><br/>
          <label htmlFor='arrapcode'>Arrival Airport Code:</label>
          <input type='text' id='arrapcode' name='arrapcode'/><br/>
          <label htmlFor='arrdate'>Arrival Date:</label>
          <input type='date' id='arrdate' name='arrdate'/><br/>
          <label htmlFor='arrtime'>Arrival Time (Local):</label>
          <input type='time' id='arrtime' name='arrtime'/><br/>
          <input type='submit' value='Submit'/>
        </form>
        <p>{data ? data.flightTime : ''}</p>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
