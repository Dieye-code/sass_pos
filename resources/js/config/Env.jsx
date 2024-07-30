import React, { Component } from 'react'

// export default class Env extends React.Component {
//      APP_URL = "http://localhost:8000"
// }


export const URL = 'DEV'

export const formatDate = (date) => {
     let d = new Date(date);
     return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
}

export const Env = {
     API_URL: URL == 'DEV' ? 'http://localhost:8000/' : 'https://shop.samacaisse.cloud/',
}
