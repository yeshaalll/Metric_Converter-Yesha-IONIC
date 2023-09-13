import {
  IonContent,
  IonPage,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonMenu,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import Options from './Options';
import './style.css';

const Home = () => {
  const [metric, setMetric] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const numberRegex =
    /^-?([0]{1}\.{1}[0-9]+|[1-9]{1}[0-9]*\.{1}[0-9]+|[0-9]+|0|-?\d+)$/gm;
  const emptyInputRegex = /^(|-?\d+)$/gm;

  useEffect(() => {
    if (metric === 'panjang') {
      from === 'kilometer' && to === 'meter'
        ? setResult(input * 1000)
        : from === 'kilometer' && to === 'centimeter'
        ? setResult(input * 100000)
        : from === 'kilometer' && to === 'milimeter'
        ? setResult(input * 1000000)
        : from === 'meter' && to === 'kilometer'
        ? setResult(input / 1000)
        : from === 'meter' && to === 'centimeter'
        ? setResult(input * 100)
        : from === 'meter' && to === 'milimeter'
        ? setResult(input * 1000)
        : from === 'centimeter' && to === 'kilometer'
        ? setResult(input / 100000)
        : from === 'centimeter' && to === 'meter'
        ? setResult(input / 100)
        : from === 'centimeter' && to === 'milimeter'
        ? setResult(input * 10)
        : from === 'milimeter' && to === 'kilometer'
        ? setResult(input / 1000000)
        : from === 'milimeter' && to === 'meter'
        ? setResult(input / 1000)
        : from === 'milimeter' && to === 'centimeter'
        ? setResult(input / 10)
        : setResult(input);
    } else if (metric === 'waktu') {
      from === 'jam' && to === 'menit'
        ? setResult(input * 60)
        : from === 'jam' && to === 'detik'
        ? setResult(input * 3600)
        : from === 'menit' && to === 'jam'
        ? setResult(input / 60)
        : from === 'menit' && to === 'detik'
        ? setResult(input * 60)
        : from === 'detik' && to === 'jam'
        ? setResult(input / 3600)
        : from === 'detik' && to === 'menit'
        ? setResult(input / 60)
        : setResult(input);
    } else if (metric === 'suhu') {
      from === 'celcius' && to === 'fahrenheit'
        ? setResult(input * (9 / 5) + 32)
        : from === 'fahrenheit' && to === 'celcius'
        ? setResult((input - 32) * (5 / 9))
        : setResult(input);
    }
  }, [from, to, input, metric]);

  useEffect(() => {
    setInput('');
    setFrom('');
    setTo('');
    setResult('');
  }, [metric]);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="navbar">Metric Converter</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p className="ion-padding">By : Yesha Anjhela Laurie</p>
          <p className="ion-padding">210211060201</p>
          <IonList>
            <IonItem>
              <IonSelect
                label="Metrik :"
                placeholder="Pilih metrik"
                onIonChange={(e) => setMetric(e.detail.value)}
              >
                <IonSelectOption value="panjang">Panjang</IonSelectOption>
                <IonSelectOption value="waktu">Waktu</IonSelectOption>
                <IonSelectOption value="suhu">Suhu</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonSelect
                label="Dari :"
                placeholder="Pilih satuan"
                value={from}
                onIonChange={(e) => setFrom(e.detail.value)}
                disabled={metric ? false : true}
              >
                {Options.map((data, key) => {
                  if (data.metric === metric) {
                    return (
                      <IonSelectOption key={key} value={data.data.value}>
                        {data.data.label}
                      </IonSelectOption>
                    );
                  }
                })}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonSelect
                label="Ke :"
                placeholder="Pilih satuan"
                value={to}
                onIonChange={(e) => setTo(e.detail.value)}
                disabled={metric ? false : true}
              >
                {Options.map((data, key) => {
                  if (data.metric === metric) {
                    return (
                      <IonSelectOption key={key} value={data.data.value}>
                        {data.data.label}
                      </IonSelectOption>
                    );
                  }
                })}
              </IonSelect>
            </IonItem>
          </IonList>
          <ion-item>
            <IonInput
              label="Nilai :"
              placeholder="Masukkan nilai"
              value={input}
              onIonInput={(e) => setInput(e.detail.value)}
            ></IonInput>
          </ion-item>
          {!numberRegex.test(`${input}`) &&
          !emptyInputRegex.test(`${input}`) ? (
            <small style={{ color: 'red' }} className="ion-padding">
              Input harus numerik!
            </small>
          ) : null}
          <ion-item>
            <p>
              Hasil :{' '}
              {from === to ? (
                <></>
              ) : metric && from && to && input && !isNaN(input) ? (
                <>
                  {result} {to}
                </>
              ) : null}
            </p>
          </ion-item>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
