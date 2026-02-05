#!/usr/bin/env node

/**
 * Script pour générer le Refresh Token Google Ads
 * 
 * Usage: node scripts/generate-google-ads-token.js
 */

const readline = require('readline');
const { google } = require('googleapis');

// Load from environment variables for security
const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID || 'YOUR_CLIENT_ID_HERE';
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET || 'YOUR_CLIENT_SECRET_HERE';
const REDIRECT_URI = 'http://localhost:5001/oauth2callback';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

// Scopes requis pour Google Ads API
const SCOPES = ['https://www.googleapis.com/auth/adwords'];

async function generateToken() {
    console.log('\n🔐 Génération du Refresh Token Google Ads\n');

    // Générer l'URL d'autorisation
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent' // Force le refresh token
    });

    console.log('📋 Étape 1: Ouvrez cette URL dans votre navigateur:\n');
    console.log(authUrl);
    console.log('\n');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('📋 Étape 2: Collez le code d\'autorisation ici: ', async (code) => {
        try {
            const { tokens } = await oauth2Client.getToken(code);

            console.log('\n✅ Refresh Token généré avec succès!\n');
            console.log('📝 Ajoutez ces valeurs dans votre fichier .env:\n');
            console.log('GOOGLE_ADS_CLIENT_ID=' + CLIENT_ID);
            console.log('GOOGLE_ADS_CLIENT_SECRET=' + CLIENT_SECRET);
            console.log('GOOGLE_ADS_DEVELOPER_TOKEN=ylJauYVmaBOIrjLpJ9ezww');
            console.log('GOOGLE_ADS_CUSTOMER_ID=8156005600');
            console.log('GOOGLE_ADS_REFRESH_TOKEN=' + tokens.refresh_token);
            console.log('\n');

        } catch (error) {
            console.error('❌ Erreur lors de la génération du token:', error.message);
        }

        rl.close();
        process.exit(0);
    });
}

generateToken();
