/** @type {import('next').NextConfig} */

const path = require('path')

module.exports = {
  env: {
    LOCAL_URL: 'https://apibg.eschools.ge',
    // LOCAL_URL: 'http://192.168.100.210:3005',
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('.'))
    return config
  },
}
