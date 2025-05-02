import './style.css'

import { initJsPsych } from 'jspsych';

import jsPsychBrowserCheck from '@jspsych/plugin-browser-check';
import jsPsychProlificData from './plugins/plugin-save-prolific-data';
import jsPsychProlificFinish from './plugins/plugin-prolific-completed';

import { demographicSurvey } from './questionnaire';
import { FirebaseManager } from '@jspsych-datamanager/firebase';
import { SupabaseManager } from '@jspsych-datamanager/supabase';

import * as configs from './exp_configs';

// Initialize Firebase if needed
const firebaseManager = new FirebaseManager(configs.firebaseConfig);
if (firebaseManager) {
    firebaseManager.initializeExperiment();
}

// Initialize Supabase if needed
const supabaseManager = new SupabaseManager(configs.supabaseConfig);
if (supabaseManager) {
    supabaseManager.initializeExperiment();
}

// Initialize jsPsych
const jsPsych = initJsPsych({
    // After each trial, we push the trial data to firestore
    on_data_update: (data: any) => {
        firebaseManager?.createDataUpdateCallback()(data);
        supabaseManager?.createDataUpdateCallback()(data);
    },
    // After the experiment is finished, we print the number of writes to firestore and download the data as a json file if the user wants to
    on_finish: () => {
        if (firebaseManager) {
            firebaseManager.createFinishCallback()();
        }
        if (supabaseManager) {
            supabaseManager.createFinishCallback()();
        }
        if (configs.DOWNLOAD_AT_END) {
            jsPsych.data.get().localSave('json', 'data.json');
        }
    }
});

// prolific data
const prolific_data_trial = {
    type: jsPsychProlificData,
    data: {
        my_trial_type: 'prolific-data',
    }
}
const prolificFinishTrial = {
    type: jsPsychProlificFinish,
    code: configs.PROLIFIC_CODE,
    data: {
        my_trial_type: 'prolific-finish',
    }
}

const browser_check = {
    type: jsPsychBrowserCheck,
}

const timeline: any[] = [
    ... configs.PROLIFIC ? [prolific_data_trial] : [],
    browser_check,
    demographicSurvey,
    ... configs.PROLIFIC ? [prolificFinishTrial] : [],
];

jsPsych.run(timeline);

