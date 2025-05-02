export const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY ? import.meta.env.VITE_FIREBASE_API_KEY : "";
export const PROLIFIC_CODE = import.meta.env.VITE_PROLIFIC_CODE ? import.meta.env.VITE_PROLIFIC_CODE : "";
export const DEBUGGING = (import.meta.env.VITE_DEBUGGING && import.meta.env.VITE_DEBUGGING === 'true') ? true : false;
export const PROLIFIC = (import.meta.env.VITE_PROLIFIC && import.meta.env.VITE_PROLIFIC === 'false') ? false : true;
export const UPLOAD_FIRESTORE = (import.meta.env.VITE_UPLOAD_FIRESTORE && import.meta.env.VITE_UPLOAD_FIRESTORE === 'false') ? false : true;
export const UPLOAD_SUPABASE = (import.meta.env.VITE_UPLOAD_SUPABASE && import.meta.env.VITE_UPLOAD_SUPABASE === 'false') ? false : true;
export const DOWNLOAD_AT_END = (import.meta.env.VITE_DOWNLOAD_AT_END && import.meta.env.VITE_DOWNLOAD_AT_END === 'true') ? true : false;

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ? import.meta.env.VITE_SUPABASE_URL : "";
export const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY ? import.meta.env.VITE_SUPABASE_API_KEY : "";

if (!import.meta.env.VITE_FIREBASE_API_KEY) {
    console.error("Firebase API key not found. Please set the VITE_FIREBASE_API_KEY environment variable.");
    throw new Error("Firebase API key not found.");
}

if (!import.meta.env.VITE_SUPABASE_API_KEY) {
    console.error("Supabase API key not found. Please set the VITE_SUPABASE_API_KEY environment variable.");
    throw new Error("Supabase API key not found.");
}

if (!import.meta.env.VITE_SUPABASE_URL) {
    console.error("Supabase URL not found. Please set the VITE_SUPABASE_URL environment variable.");
    throw new Error("Supabase URL not found.");
}

if (UPLOAD_FIRESTORE && FIREBASE_API_KEY === "") {
    console.error("Firebase API key not found. Please set the VITE_FIREBASE_API_KEY environment variable.");
    throw new Error("Firebase API key not found.");
}

if (UPLOAD_SUPABASE && SUPABASE_API_KEY === "") {
    console.error("Supabase API key not found. Please set the VITE_SUPABASE_API_KEY environment variable.");
    throw new Error("Supabase API key not found.");
}

// Initialize Firebase
export const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

export const supabaseConfig = {
    url: SUPABASE_URL,
    anonKey: SUPABASE_API_KEY,
};

