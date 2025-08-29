import React, { Component } from 'react'

// export default class Env extends React.Component {
//      APP_URL = "http://localhost:8000"
// }


export const URL = 'DEV'

export const formatDate = (date) => {
     let d = new Date(date);
     var month = d.getMonth() + 1;
     return d.getDate() + "/" + month + "/" + d.getFullYear();
}

export const Env = {
     API_URL: window.location.origin+'/',
}


export const getStorageLink = (link) => {
     return `${window.location.origin}/storage/${link}`
}