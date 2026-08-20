import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 20,          // 20 usuarios virtuales
  duration: '2m',   // prueba de 2 minutos
};

export default function () {
  const BASE_URL = 'https://cicdtraining-312627313824.us-central1.run.app/api/work';

  const r = Math.random();
  if (r < 0.33) {
    http.get(`${BASE_URL}?ms=200`);       // tráfico normal
  } else if (r < 0.66) {
    http.get(`${BASE_URL}?fail=true`);    // errores 5xx
  } else {
    http.get(`${BASE_URL}?ms=900`);       // latencia alta
  }
  sleep(1);
}
