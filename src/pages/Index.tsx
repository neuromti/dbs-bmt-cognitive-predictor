import { useState } from "react";

type Therapy = "DBS" | "BMT";

type FeatureDefinition = {
  key: string;
  label: string;
  placeholder: string;
  min: number;
  max: number;
};

type EnsembleMember = {
  member: number;
  intercept: number;
  coefficients: Record<string, number>;
};

type PredictionResult = {
  model: Therapy;
  memberPredictions: number[];
  ensemblePrediction: number;
};

const MODELS: Record<Therapy, { features: FeatureDefinition[]; members: EnsembleMember[] }> = {
  BMT: {
    features: [
      { key: "AGE_AT_BASELINE", label: "Age (Years)", placeholder: "e.g. 64", min: 30, max: 100 },
      { key: "MoCA_Erinnerung_sum_pre", label: "MoCA Memory (Delayed Recall)", placeholder: "0–5", min: 0, max: 5 },
      { key: "MoCA_Sprache_sum_pre", label: "MoCA Speech", placeholder: "0–3", min: 0, max: 3 },
    ],
    members: [
      { member: 0, intercept: 23.919016334914346, coefficients: { AGE_AT_BASELINE: -0.05624697883657502, MoCA_Erinnerung_sum_pre: 0.8030201985545259, MoCA_Sprache_sum_pre: 1.3037873925123988 } },
      { member: 1, intercept: 24.610023384011946, coefficients: { AGE_AT_BASELINE: -0.05778437798962551, MoCA_Erinnerung_sum_pre: 0.7865079752442541, MoCA_Sprache_sum_pre: 1.0872347392811754 } },
      { member: 2, intercept: 23.98918020392931, coefficients: { AGE_AT_BASELINE: -0.056392601073107, MoCA_Erinnerung_sum_pre: 0.8017806226791228, MoCA_Sprache_sum_pre: 1.2808821354465483 } },
      { member: 3, intercept: 23.98918020392931, coefficients: { AGE_AT_BASELINE: -0.056392601073107, MoCA_Erinnerung_sum_pre: 0.8017806226791228, MoCA_Sprache_sum_pre: 1.2808821354465483 } },
      { member: 4, intercept: 23.98918020392931, coefficients: { AGE_AT_BASELINE: -0.056392601073107, MoCA_Erinnerung_sum_pre: 0.8017806226791228, MoCA_Sprache_sum_pre: 1.2808821354465483 } },
      { member: 5, intercept: 23.98918020392931, coefficients: { AGE_AT_BASELINE: -0.056392601073107, MoCA_Erinnerung_sum_pre: 0.8017806226791228, MoCA_Sprache_sum_pre: 1.2808821354465483 } },
      { member: 6, intercept: 24.610023384011946, coefficients: { AGE_AT_BASELINE: -0.05778437798962551, MoCA_Erinnerung_sum_pre: 0.7865079752442541, MoCA_Sprache_sum_pre: 1.0872347392811754 } },
      { member: 7, intercept: 23.98918020392931, coefficients: { AGE_AT_BASELINE: -0.056392601073107, MoCA_Erinnerung_sum_pre: 0.8017806226791228, MoCA_Sprache_sum_pre: 1.2808821354465483 } },
      { member: 8, intercept: 23.98918020392931, coefficients: { AGE_AT_BASELINE: -0.056392601073107, MoCA_Erinnerung_sum_pre: 0.8017806226791228, MoCA_Sprache_sum_pre: 1.2808821354465483 } },
      { member: 9, intercept: 23.98918020392931, coefficients: { AGE_AT_BASELINE: -0.056392601073107, MoCA_Erinnerung_sum_pre: 0.8017806226791228, MoCA_Sprache_sum_pre: 1.2808821354465483 } },
    ],
  },
  DBS: {
    features: [
      { key: "UPDRS_on", label: "Preop UPDRS-III (On Medication)", placeholder: "e.g. 32", min: 0, max: 108 },
      { key: "MoCA_Executive_sum_pre", label: "MoCA Executive / Visuospatial", placeholder: "0–5", min: 0, max: 5 },
      { key: "MoCA_Erinnerung_sum_pre", label: "MoCA Memory (Delayed Recall)", placeholder: "0–5", min: 0, max: 5 },
      { key: "TimeSinceDiag", label: "Disease Duration (Years)", placeholder: "e.g. 8", min: 0, max: 40 },
    ],
    members: [
      { member: 0, intercept: 19.342897396549567, coefficients: { TimeSinceDiag: -0.11904718353677994, UPDRS_on: -0.07755555106566912, MoCA_Executive_sum_pre: 1.5089647711561303, MoCA_Erinnerung_sum_pre: 0.6229737223205263 } },
      { member: 1, intercept: 17.562047359901285, coefficients: { TimeSinceDiag: -0.12076843636362461, UPDRS_on: -0.07374717010188162, MoCA_Executive_sum_pre: 1.8344039460291781, MoCA_Erinnerung_sum_pre: 0.674243584875132 } },
      { member: 2, intercept: 19.342897396549567, coefficients: { TimeSinceDiag: -0.11904718353677994, UPDRS_on: -0.07755555106566912, MoCA_Executive_sum_pre: 1.5089647711561303, MoCA_Erinnerung_sum_pre: 0.6229737223205263 } },
      { member: 3, intercept: 19.342897396549567, coefficients: { TimeSinceDiag: -0.11904718353677994, UPDRS_on: -0.07755555106566912, MoCA_Executive_sum_pre: 1.5089647711561303, MoCA_Erinnerung_sum_pre: 0.6229737223205263 } },
      { member: 4, intercept: 19.342897396549567, coefficients: { TimeSinceDiag: -0.11904718353677994, UPDRS_on: -0.07755555106566912, MoCA_Executive_sum_pre: 1.5089647711561303, MoCA_Erinnerung_sum_pre: 0.6229737223205263 } },
      { member: 5, intercept: 17.348420211996157, coefficients: { TimeSinceDiag: -0.12091870495127113, UPDRS_on: -0.07328177389844254, MoCA_Executive_sum_pre: 1.8740702823883053, MoCA_Erinnerung_sum_pre: 0.6795044097361816 } },
      { member: 6, intercept: 19.342897396549567, coefficients: { TimeSinceDiag: -0.11904718353677994, UPDRS_on: -0.07755555106566912, MoCA_Executive_sum_pre: 1.5089647711561303, MoCA_Erinnerung_sum_pre: 0.6229737223205263 } },
      { member: 7, intercept: 17.562047359901285, coefficients: { TimeSinceDiag: -0.12076843636362461, UPDRS_on: -0.07374717010188162, MoCA_Executive_sum_pre: 1.8344039460291781, MoCA_Erinnerung_sum_pre: 0.674243584875132 } },
      { member: 8, intercept: 19.91674300706791, coefficients: { TimeSinceDiag: -0.11207371082434821, UPDRS_on: -0.07809075917929505, MoCA_Executive_sum_pre: 1.423090115033568, MoCA_Erinnerung_sum_pre: 0.5662140368482544 } },
      { member: 9, intercept: 17.562047359901285, coefficients: { TimeSinceDiag: -0.12076843636362461, UPDRS_on: -0.07374717010188162, MoCA_Executive_sum_pre: 1.8344039460291781, MoCA_Erinnerung_sum_pre: 0.674243584875132 } },
    ],
  },
};

const predictLinearMember = (
  features: Record<string, number>,
  intercept: number,
  coefficients: Record<string, number>,
) => intercept + Object.entries(coefficients).reduce((sum, [key, coefficient]) => sum + features[key] * coefficient, 0);

const Index = () => {
  const [therapy, setTherapy] = useState<Therapy>("DBS");
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<PredictionResult | null>(null);

  const model = MODELS[therapy];

  const handleSwitch = (t: Therapy) => {
    setTherapy(t);
    setValues({});
    setErrors({});
    setResult(null);
  };

  const handleChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setResult(null);
  };

  const allFilled = model.features.every((f) => values[f.key] !== undefined && values[f.key].trim() !== "");

  const getValidatedNumericValues = () => {
    const nextErrors: Record<string, string> = {};
    const numericValues: Record<string, number> = {};

    model.features.forEach((feature) => {
      const rawValue = values[feature.key];

      if (rawValue === undefined || rawValue === null || rawValue.trim() === "") {
        nextErrors[feature.key] = "This field is required.";
        return;
      }

      const parsedValue = Number(rawValue);

      if (Number.isNaN(parsedValue) || !Number.isFinite(parsedValue)) {
        nextErrors[feature.key] = "Enter a valid number.";
        return;
      }

      numericValues[feature.key] = parsedValue;
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0 ? numericValues : null;
  };

  const calculate = () => {
    const numericValues = getValidatedNumericValues();
    if (!numericValues) return;

    const memberPredictions = model.members.map((member) =>
      predictLinearMember(numericValues, member.intercept, member.coefficients),
    );
    const ensemblePrediction =
      memberPredictions.reduce((sum, prediction) => sum + prediction, 0) / memberPredictions.length;

    setResult({
      model: therapy,
      memberPredictions,
      ensemblePrediction,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="bg-muted border-b border-border py-2.5 px-6">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground text-center font-medium">
          For Research Use Only • Not for Medical Decision Making
        </p>
      </div>

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-foreground mb-2">
          Predicting cognitive outcome in{" "}
          <span className="text-secondary italic">Parkinson's Disease</span>
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-10 max-w-[55ch]">
          Therapy-specific Elastic Net ensemble prediction of MoCA change over two years.
          Select a therapeutic pathway and enter baseline patient data.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-10">
          {(["DBS", "BMT"] as const).map((t) => (
            <button
              key={t}
              onClick={() => handleSwitch(t)}
              className={`rounded-2xl p-5 transition-all border backdrop-blur-sm ${
                therapy === t
                  ? "bg-card border-accent shadow-sm ring-1 ring-accent/20"
                  : "bg-card/60 border-border hover:border-secondary/30"
              }`}
            >
              <h3 className="text-lg font-medium text-foreground">{t}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {t === "DBS" ? "Deep Brain Stimulation" : "Best Medical Therapy"}
              </p>
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-card/65 backdrop-blur-sm border border-border p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
            {model.features.map((f) => (
              <div key={f.key} className="space-y-1.5">
                <label className="text-sm font-medium text-foreground block">{f.label}</label>
                <input
                  type="number"
                  placeholder={f.placeholder}
                  min={f.min}
                  max={f.max}
                  step="any"
                  value={values[f.key] || ""}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                  className="w-full bg-transparent border-b border-border py-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-secondary transition-colors tabular-nums"
                />
                <div className="flex items-center justify-between gap-3 text-[11px]">
                  <span className="text-muted-foreground">Feature key: {f.key}</span>
                  <span className="text-muted-foreground">{f.min}–{f.max}</span>
                </div>
                {errors[f.key] && <p className="text-xs text-destructive">{errors[f.key]}</p>}
              </div>
            ))}
          </div>

          <button
            onClick={calculate}
            disabled={!allFilled}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90"
          >
            Estimate MoCA Outcome
          </button>
        </div>

        {result && (
          <div className="mt-8 rounded-2xl bg-card/65 backdrop-blur-sm border border-border p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Estimated 2-Year MoCA Score ({result.model})
              </p>
              <p className="text-6xl font-light tabular-nums text-foreground tracking-tight">
                {result.ensemblePrediction.toFixed(1)}
                <span className="text-xl text-muted-foreground ml-2">/ 30</span>
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
              {result.memberPredictions.map((prediction, index) => (
                <div key={index} className="rounded-xl border border-border bg-background/40 p-3 text-center">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Member {index + 1}</p>
                  <p className="mt-1 text-lg font-medium tabular-nums text-foreground">{prediction.toFixed(1)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20 text-left">
              <p className="text-xs text-accent-foreground leading-relaxed">
                <strong>Disclaimer:</strong> This prediction is solely for research purposes and should not be used for medical decision making, clinical diagnosis, treatment selection, or patient counseling.
              </p>
            </div>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-prose">
            <strong>Reference:</strong> Therapy-specific predictive modeling for cognitive outcome
            in Parkinson's disease. Elastic Net regression models comparing STN-DBS and BMT
            cohorts for Montreal Cognitive Assessment change over two years.
          </p>
        </div>
      </main>

      <footer className="py-6 px-6 border-t border-border text-center">
        <p className="text-[11px] text-muted-foreground">
          © 2025 Institute for Neuromodulation and Neurotechnology, Tübingen, Germany • Not for Clinical Use
        </p>
      </footer>
    </div>
  );
};

export default Index;
