import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/common/Button";
import { AnimatedButton } from "@/components/common/AnimatedButton";

interface Question {
  id: string;
  question: string;
  type: "multiple-choice" | "text" | "scale" | "yes-no" | "age" | "gender";
  options?: string[];
  required: boolean;
  genders?: ("male" | "female" | "other")[];
}

interface QuestionnaireData {
  [category: string]: Question[];
}

const AgeInput: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => (
  <input
    type="number"
    min="18"
    max="100"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Enter your age"
    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10552E] focus:border-transparent text-lg"
  />
);

export default function QuestionnairePage() {
  const router = useRouter();
  const { category } = router.query;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("hormones");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (category && typeof category === "string") {
      setSelectedCategory(category);
    }
  }, [category]);

  const questionnaireData: QuestionnaireData = {
    hormones: [
      { id: "age", question: "What is your age?", type: "age", required: true },
      { id: "gender", question: "What is your biological sex?", type: "gender", options: ["Male", "Female", "Other"], required: true },
      { id: "energy_levels", question: "How would you describe your energy levels throughout the day?", type: "multiple-choice", options: ["Consistently high", "Moderate with some dips", "Often fatigued", "Constantly exhausted"], required: true },
      { id: "sleep_quality", question: "How would you rate your sleep quality?", type: "scale", options: ["1 - Very Poor", "2 - Poor", "3 - Fair", "4 - Good", "5 - Excellent"], required: true },
      { id: "libido", question: "Have you noticed changes in your libido or sexual function?", type: "multiple-choice", options: ["No changes", "Slight decrease", "Significant decrease", "Prefer not to answer"], required: true },
      { id: "mood_changes", question: "Do you experience mood swings, irritability, or depressive symptoms?", type: "multiple-choice", options: ["Rarely or never", "Occasionally", "Frequently", "Almost daily"], required: true },
      { id: "muscle_mass", question: "Have you noticed changes in your muscle mass or strength?", type: "multiple-choice", options: ["No changes", "Slight decrease", "Significant decrease", "Increased"], required: true },
      { id: "weight_changes", question: "Have you experienced unexplained weight changes?", type: "multiple-choice", options: ["No changes", "Weight gain", "Weight loss", "Fluctuating weight"], required: true },
      { id: "brain_fog", question: "Do you experience brain fog or difficulty concentrating?", type: "multiple-choice", options: ["Rarely or never", "Occasionally", "Frequently", "Almost always"], required: true },
      { id: "hot_flashes", question: "Do you experience hot flashes or night sweats?", type: "yes-no", options: ["Yes", "No"], required: true, genders: ["female"] },
      { id: "menstrual_changes", question: "Have you noticed changes in your menstrual cycle?", type: "multiple-choice", options: ["No changes", "Irregular periods", "Heavier/lighter flow", "Stopped menstruating", "N/A"], required: true, genders: ["female"] },
      { id: "previous_hormone_testing", question: "Have you had hormone levels tested before?", type: "yes-no", options: ["Yes", "No"], required: true },
      { id: "current_medications", question: "Are you currently taking any medications or supplements?", type: "text", required: false },
      { id: "health_goals", question: "What are your primary health optimization goals?", type: "text", required: true },
    ],
    aesthetics: [
      { id: "age", question: "What is your age?", type: "age", required: true },
      { id: "gender", question: "What is your biological sex?", type: "gender", options: ["Male", "Female", "Other"], required: true },
      { id: "hair_loss_pattern", question: "How would you describe your hair loss pattern?", type: "multiple-choice", options: ["Receding hairline", "Thinning crown", "Diffuse thinning all over", "Patchy loss", "No noticeable loss"], required: true },
      { id: "hair_loss_duration", question: "How long have you noticed hair changes?", type: "multiple-choice", options: ["Less than 6 months", "6-12 months", "1-3 years", "More than 3 years"], required: true },
      { id: "family_history", question: "Is there a family history of hair loss?", type: "multiple-choice", options: ["Yes, maternal side", "Yes, paternal side", "Yes, both sides", "No family history", "Unknown"], required: true },
      { id: "previous_treatments", question: "Have you tried any hair loss treatments before?", type: "multiple-choice", options: ["None", "Minoxidil (Rogaine)", "Finasteride/Dutasteride", "PRP treatments", "Hair transplant", "Multiple treatments"], required: true },
      { id: "skin_concerns", question: "Do you have any skin concerns you'd like to address?", type: "multiple-choice", options: ["Acne", "Aging signs", "Hyperpigmentation", "Rosacea", "No concerns", "Multiple concerns"], required: true },
      { id: "skincare_routine", question: "How would you describe your current skincare routine?", type: "multiple-choice", options: ["Non-existent", "Basic (cleanser only)", "Moderate (cleanser + moisturizer)", "Comprehensive", "Professional grade"], required: true },
      { id: "sun_exposure", question: "How much sun exposure do you typically get?", type: "multiple-choice", options: ["Minimal (indoor lifestyle)", "Moderate (some outdoor time)", "High (frequent outdoor activities)", "Very high (outdoor work)"], required: true },
      { id: "aesthetic_goals", question: "What are your primary aesthetic goals?", type: "text", required: true },
    ],
    metabolic: [
      { id: "age", question: "What is your age?", type: "age", required: true },
      { id: "gender", question: "What is your biological sex?", type: "gender", options: ["Male", "Female", "Other"], required: true },
      { id: "current_weight", question: "What is your approximate current weight?", type: "text", required: true },
      { id: "weight_history", question: "How would you describe your weight history?", type: "multiple-choice", options: ["Always been at a healthy weight", "Gradual weight gain over years", "Yo-yo dieting", "Recent significant weight change", "Lifelong struggle with weight"], required: true },
      { id: "diet_attempts", question: "How many serious diet/weight loss attempts have you made?", type: "multiple-choice", options: ["None", "1-2", "3-5", "More than 5"], required: true },
      { id: "eating_patterns", question: "How would you describe your eating patterns?", type: "multiple-choice", options: ["Regular meals, controlled portions", "Irregular meals", "Emotional eating", "Late-night eating", "Frequent snacking"], required: true },
      { id: "exercise_frequency", question: "How often do you exercise?", type: "multiple-choice", options: ["Never", "1-2 times per week", "3-4 times per week", "5+ times per week"], required: true },
      { id: "metabolic_conditions", question: "Have you been diagnosed with any metabolic conditions?", type: "multiple-choice", options: ["None", "Prediabetes", "Type 2 Diabetes", "Metabolic syndrome", "PCOS", "Thyroid disorder"], required: true },
      { id: "medications_tried", question: "Have you tried weight loss medications before?", type: "multiple-choice", options: ["None", "Phentermine", "Orlistat", "GLP-1 medications", "Other prescription", "Multiple medications"], required: true },
      { id: "weight_goals", question: "What is your weight loss goal?", type: "text", required: true },
    ],
    cognitive: [
      { id: "age", question: "What is your age?", type: "age", required: true },
      { id: "gender", question: "What is your biological sex?", type: "gender", options: ["Male", "Female", "Other"], required: true },
      { id: "focus_issues", question: "Do you experience difficulty focusing or concentrating?", type: "multiple-choice", options: ["Rarely", "Sometimes", "Often", "Almost always"], required: true },
      { id: "memory_concerns", question: "Do you have concerns about your memory?", type: "multiple-choice", options: ["No concerns", "Minor forgetfulness", "Noticeable memory issues", "Significant memory problems"], required: true },
      { id: "mental_fatigue", question: "How often do you experience mental fatigue?", type: "multiple-choice", options: ["Rarely", "End of long days", "Most afternoons", "Throughout the day"], required: true },
      { id: "sleep_hours", question: "How many hours of sleep do you typically get?", type: "multiple-choice", options: ["Less than 5", "5-6 hours", "7-8 hours", "More than 8 hours"], required: true },
      { id: "caffeine_use", question: "How much caffeine do you consume daily?", type: "multiple-choice", options: ["None", "1-2 cups of coffee", "3-4 cups", "5+ cups or energy drinks"], required: true },
      { id: "cognitive_demands", question: "What are your primary cognitive demands?", type: "multiple-choice", options: ["Academic/studying", "Professional/work", "Creative pursuits", "General mental sharpness"], required: true },
      { id: "supplements_tried", question: "Have you tried cognitive supplements before?", type: "multiple-choice", options: ["None", "Basic vitamins", "Nootropics", "Prescription medications", "Multiple supplements"], required: true },
      { id: "cognitive_goals", question: "What cognitive improvements are you hoping to achieve?", type: "text", required: true },
    ],
    mental: [
      { id: "age", question: "What is your age?", type: "age", required: true },
      { id: "gender", question: "What is your biological sex?", type: "gender", options: ["Male", "Female", "Other"], required: true },
      { id: "stress_level", question: "How would you rate your current stress level?", type: "scale", options: ["1 - Very Low", "2 - Low", "3 - Moderate", "4 - High", "5 - Very High"], required: true },
      { id: "anxiety_frequency", question: "How often do you experience anxiety?", type: "multiple-choice", options: ["Rarely or never", "Occasionally", "Frequently", "Almost constantly"], required: true },
      { id: "mood_state", question: "How would you describe your general mood?", type: "multiple-choice", options: ["Generally positive", "Neutral", "Often low", "Frequently depressed"], required: true },
      { id: "sleep_issues", question: "Do you have trouble sleeping due to worry or anxiety?", type: "multiple-choice", options: ["Never", "Occasionally", "Often", "Almost every night"], required: true },
      { id: "social_impact", question: "Do mental health concerns affect your social life?", type: "multiple-choice", options: ["Not at all", "Slightly", "Moderately", "Significantly"], required: true },
      { id: "work_impact", question: "Do mental health concerns affect your work/productivity?", type: "multiple-choice", options: ["Not at all", "Slightly", "Moderately", "Significantly"], required: true },
      { id: "previous_treatment", question: "Have you received mental health treatment before?", type: "multiple-choice", options: ["Never", "Therapy only", "Medication only", "Both therapy and medication"], required: true },
      { id: "support_system", question: "Do you have a support system (friends, family)?", type: "multiple-choice", options: ["Strong support", "Moderate support", "Limited support", "No support"], required: true },
      { id: "mental_health_goals", question: "What are your mental wellness goals?", type: "text", required: true },
    ],
    longevity: [
      { id: "age", question: "What is your age?", type: "age", required: true },
      { id: "gender", question: "What is your biological sex?", type: "gender", options: ["Male", "Female", "Other"], required: true },
      { id: "health_status", question: "How would you describe your overall health?", type: "scale", options: ["1 - Poor", "2 - Fair", "3 - Good", "4 - Very Good", "5 - Excellent"], required: true },
      { id: "family_longevity", question: "Do you have long-lived relatives (80+ years)?", type: "multiple-choice", options: ["Yes, multiple", "Yes, some", "No", "Unknown"], required: true },
      { id: "chronic_conditions", question: "Do you have any chronic health conditions?", type: "multiple-choice", options: ["None", "Cardiovascular issues", "Metabolic issues", "Autoimmune conditions", "Multiple conditions"], required: true },
      { id: "exercise_habits", question: "How often do you exercise?", type: "multiple-choice", options: ["Never", "1-2 times/week", "3-4 times/week", "5+ times/week"], required: true },
      { id: "diet_quality", question: "How would you rate your diet quality?", type: "scale", options: ["1 - Very Poor", "2 - Poor", "3 - Average", "4 - Good", "5 - Excellent"], required: true },
      { id: "alcohol_tobacco", question: "Do you use alcohol or tobacco?", type: "multiple-choice", options: ["Neither", "Occasional alcohol", "Regular alcohol", "Tobacco user", "Both"], required: true },
      { id: "stress_management", question: "How well do you manage stress?", type: "scale", options: ["1 - Very Poorly", "2 - Poorly", "3 - Moderately", "4 - Well", "5 - Very Well"], required: true },
      { id: "previous_testing", question: "Have you done longevity/biological age testing before?", type: "yes-no", options: ["Yes", "No"], required: true },
      { id: "longevity_goals", question: "What are your primary longevity and health optimization goals?", type: "text", required: true },
    ],
    sexual: [
      { id: "age", question: "What is your age?", type: "age", required: true },
      { id: "gender", question: "What is your biological sex?", type: "gender", options: ["Male", "Female", "Other"], required: true },
      { id: "libido_level", question: "How would you describe your current libido?", type: "scale", options: ["1 - Very Low", "2 - Low", "3 - Moderate", "4 - Good", "5 - High"], required: true },
      { id: "erectile_function", question: "Do you experience erectile difficulties?", type: "multiple-choice", options: ["No difficulties", "Occasional issues", "Frequent difficulties", "Unable to achieve/maintain", "N/A"], required: true, genders: ["male"] },
      { id: "arousal_issues", question: "Do you experience difficulties with arousal?", type: "multiple-choice", options: ["No difficulties", "Occasional issues", "Frequent difficulties", "Significant problems", "N/A"], required: true, genders: ["female"] },
      { id: "satisfaction", question: "How satisfied are you with your sexual health?", type: "scale", options: ["1 - Very Unsatisfied", "2 - Unsatisfied", "3 - Neutral", "4 - Satisfied", "5 - Very Satisfied"], required: true },
      { id: "relationship_status", question: "What is your relationship status?", type: "multiple-choice", options: ["Single", "In a relationship", "Married", "Prefer not to say"], required: true },
      { id: "previous_treatments", question: "Have you tried treatments for sexual health before?", type: "multiple-choice", options: ["None", "ED medications", "Hormone therapy", "Supplements", "Counseling", "Multiple approaches"], required: true },
      { id: "contributing_factors", question: "Are there factors you think may be contributing?", type: "multiple-choice", options: ["Stress", "Relationship issues", "Medical conditions", "Medications", "Age-related", "Unsure"], required: true },
      { id: "sexual_health_goals", question: "What improvements in sexual health are you hoping to achieve?", type: "text", required: true },
    ],
    performance: [
      { id: "age", question: "What is your age?", type: "age", required: true },
      { id: "gender", question: "What is your biological sex?", type: "gender", options: ["Male", "Female", "Other"], required: true },
      { id: "activity_type", question: "What is your primary physical activity?", type: "multiple-choice", options: ["Strength training", "Endurance sports", "Team sports", "Combat sports", "Mixed/CrossFit", "General fitness"], required: true },
      { id: "training_frequency", question: "How often do you train?", type: "multiple-choice", options: ["1-2 times/week", "3-4 times/week", "5-6 times/week", "Daily or more"], required: true },
      { id: "competition_level", question: "What is your competition level?", type: "multiple-choice", options: ["Recreational", "Amateur competitive", "Semi-professional", "Professional"], required: true },
      { id: "recovery_quality", question: "How well do you recover between sessions?", type: "scale", options: ["1 - Very Poorly", "2 - Poorly", "3 - Moderately", "4 - Well", "5 - Very Well"], required: true },
      { id: "injury_history", question: "Do you have recurring injuries?", type: "multiple-choice", options: ["No injuries", "Minor occasional issues", "One recurring injury", "Multiple recurring injuries"], required: true },
      { id: "current_supplements", question: "What supplements do you currently use?", type: "multiple-choice", options: ["None", "Basic (protein, creatine)", "Moderate stack", "Comprehensive stack"], required: true },
      { id: "performance_plateau", question: "Are you experiencing a performance plateau?", type: "yes-no", options: ["Yes", "No"], required: true },
      { id: "performance_goals", question: "What are your specific performance goals?", type: "text", required: true },
    ],
    wellness: [
      { id: "age", question: "What is your age?", type: "age", required: true },
      { id: "gender", question: "What is your biological sex?", type: "gender", options: ["Male", "Female", "Other"], required: true },
      { id: "sleep_duration", question: "How many hours do you typically sleep?", type: "multiple-choice", options: ["Less than 5", "5-6 hours", "7-8 hours", "More than 8 hours"], required: true },
      { id: "sleep_quality", question: "How would you rate your sleep quality?", type: "scale", options: ["1 - Very Poor", "2 - Poor", "3 - Fair", "4 - Good", "5 - Excellent"], required: true },
      { id: "falling_asleep", question: "Do you have trouble falling asleep?", type: "multiple-choice", options: ["Never", "Occasionally", "Often", "Almost every night"], required: true },
      { id: "staying_asleep", question: "Do you wake up during the night?", type: "multiple-choice", options: ["Never", "Once occasionally", "Multiple times", "Frequently throughout"], required: true },
      { id: "morning_feeling", question: "How do you feel when you wake up?", type: "multiple-choice", options: ["Refreshed and energized", "Somewhat rested", "Still tired", "Exhausted"], required: true },
      { id: "sleep_aids", question: "Do you use sleep aids?", type: "multiple-choice", options: ["None", "Occasional OTC aids", "Regular supplements", "Prescription medication"], required: true },
      { id: "sleep_environment", question: "How is your sleep environment?", type: "multiple-choice", options: ["Optimal (dark, cool, quiet)", "Mostly good", "Some issues", "Poor conditions"], required: true },
      { id: "screen_time", question: "Do you use screens before bed?", type: "multiple-choice", options: ["Never", "Occasionally", "Usually", "Always"], required: true },
      { id: "sleep_goals", question: "What sleep improvements are you hoping to achieve?", type: "text", required: true },
    ],
  };

  const currentQuestions = questionnaireData[selectedCategory] || questionnaireData.hormones;
  
  // Filter questions based on gender
  const getVisibleQuestions = () => {
    const gender = answers["gender"]?.toLowerCase();
    return currentQuestions.filter(q => {
      if (!q.genders) return true;
      if (!gender) return true;
      return q.genders.includes(gender as "male" | "female" | "other");
    });
  };
  
  const visibleQuestions = getVisibleQuestions();
  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / visibleQuestions.length) * 100;

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < visibleQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
      // Store results
      localStorage.setItem('lonvia-questionnaire-results', JSON.stringify({
        category: selectedCategory,
        answers,
        completedAt: new Date().toISOString()
      }));
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const canProceed = () => {
    if (!currentQuestion) return false;
    if (!currentQuestion.required) return true;
    return !!answers[currentQuestion.id];
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0E5A46] to-[#10552E] flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Assessment Complete!</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Thank you for completing the {selectedCategory} optimization questionnaire. 
            Our team will review your responses and prepare personalized recommendations.
          </p>
          <div className="space-y-4">
            <AnimatedButton onClick={() => router.push('/case/create')} className="w-full">
              Schedule Your Consultation
            </AnimatedButton>
            <Button variant="outline" onClick={() => router.push('/lonvia-labs')} className="w-full">
              Return to Lonvia Labs
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <p>Loading questionnaire...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-[#10552E] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm py-4 px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.push('/lonvia-labs')}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Lonvia Labs
          </button>
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {visibleQuestions.length}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 bg-[#10552E]/10 text-[#10552E] px-4 py-2 rounded-full mb-8">
            <span className="font-semibold capitalize">{selectedCategory} Assessment</span>
          </div>

          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            {currentQuestion.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-4 mb-12">
            {currentQuestion.type === "age" && (
              <AgeInput 
                value={answers[currentQuestion.id] || ""} 
                onChange={(value) => handleAnswer(value)}
              />
            )}

            {currentQuestion.type === "text" && (
              <textarea
                value={answers[currentQuestion.id] || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10552E] focus:border-transparent min-h-[120px] text-lg"
              />
            )}

            {(currentQuestion.type === "multiple-choice" || 
              currentQuestion.type === "scale" || 
              currentQuestion.type === "yes-no" ||
              currentQuestion.type === "gender") && 
              currentQuestion.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    answers[currentQuestion.id] === option
                      ? "border-[#10552E] bg-[#10552E]/5 text-[#10552E]"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <span className="text-lg">{option}</span>
                </button>
              ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              className="px-6"
            >
              Back
            </Button>
            
            <AnimatedButton
              onClick={handleNext}
              className={!canProceed() ? "opacity-50 cursor-not-allowed" : ""}
            >
              {currentQuestionIndex === visibleQuestions.length - 1 ? "Complete" : "Continue"}
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}

