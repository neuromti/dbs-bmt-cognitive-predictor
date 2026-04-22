# DBS BMT Cognitive Predictor

Web based predictor for estimated 2 year cognitive outcome in Parkinson’s disease using therapy specific ensemble Elastic Net models for subthalamic nucleus deep brain stimulation (DBS) and best medical therapy (BMT).

Disclaimer: This prediction is solely for research purposes and should not be used for medical decision making, clinical diagnosis, treatment selection, or patient counseling.

## Overview

This repository contains a lightweight website that computes predicted follow up Montreal Cognitive Assessment (MoCA) scores from baseline clinical and cognitive features. The implementation is based on the therapy specific predictive models described in the accompanying manuscript, which reports that predictive structure differs between DBS and BMT even when group level cognitive outcomes are comparable. :contentReference[oaicite:0]{index=0}

## Models included

### BMT model
Inputs:
- `AGE_AT_BASELINE`
- `MoCA_Erinnerung_sum_pre`
- `MoCA_Sprache_sum_pre`

### DBS model
Inputs:
- `TimeSinceDiag`
- `UPDRS_on`
- `MoCA_Executive_sum_pre`
- `MoCA_Erinnerung_sum_pre`

Both models are implemented as ensemble Elastic Net regressors using pre extracted coefficients for browser based inference.

## Purpose

The tool is intended to support transparent research use by allowing users to enter baseline features and obtain model based predictions for:
- BMT cognitive outcome
- DBS cognitive outcome

The manuscript found that the BMT model relied mainly on age, memory, and language, whereas the DBS model relied mainly on motor function, executive function, memory, and disease duration, supporting therapy specific prediction. :contentReference[oaicite:1]{index=1}

## Source manuscript

This website is derived from the manuscript:

**Therapy specific predictive modeling for cognitive outcome in Parkinson’s disease**  
Farzin Negahbani, Georg Tirpitz, Frieder Wizgall, Riccardo Gaeckle, Luca Michael Nelissen, Idil Cebi, Daniel Weiss, Alireza Gharabaghi :contentReference[oaicite:2]{index=2}

## Important note

This repository is based on a manuscript that is currently under submission. The website is intended for research and demonstration purposes. It is not a medical device and should not be used as the sole basis for clinical decision making. This is consistent with the manuscript’s framing of the models as research prognostic tools for individualized prediction in matched DBS and BMT cohorts. :contentReference[oaicite:3]{index=3}

## Deployment

The site is designed for static deployment via GitHub Pages and GitHub Actions, with all model parameters stored in plain JSON rather than serialized pickle files.

## Citation

If you use this repository, please cite the associated manuscript once published.
