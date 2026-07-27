export const WHATSAPP_URL = "https://links.cppem.com.br/cppem-contato";

/** Web App do Google Apps Script que grava os leads na aba SUPLETIVO. */
export const LEADS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxdFplWVSfhTjvyIA7HIWb645xRjGNhBVhTdTf5UMjo0lSpW_A_jCuys0qB4uImKXPQ/exec";

export const LEADS_SHEET = "SUPLETIVO";

/** O Apps Script escolhe a aba pela query string (?aba=SUPLETIVO). */
export const LEADS_URL = `${LEADS_ENDPOINT}?aba=${encodeURIComponent(LEADS_SHEET)}`;

/**
 * Loader first-party do container GTM server-side. O ID do container está
 * embutido no path (/metrics/), por isso não há parâmetro `id=GTM-XXXX`.
 */
export const GTM_LOADER_URL = "https://sgtm.cppem.com.br/metrics/";

/**
 * ID do <form> de captação. É o identificador usado no painel da PixelX e
 * precisa ser único na página e idêntico ao que está configurado lá.
 */
export const PIXELX_FORM_ID = "IPEyzyfmJhKQEYIXAlZH";

export const WHATSAPP_MESSAGES = {
  default: "Olá! Quero saber mais sobre o Supletivo em 90 dias.",
  popup:
    "Olá! Vi a condição especial no site e quero iniciar o supletivo HOJE.",
  plan_medio: "Olá! Tenho interesse no Supletivo do Ensino Médio.",
  plan_completo: "Olá! Tenho interesse no Supletivo Fundamental + Médio.",
};

export const NAV_LINKS: { href: string; label: string }[] = [];
