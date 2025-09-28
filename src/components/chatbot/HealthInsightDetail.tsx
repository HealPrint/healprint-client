import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, BookOpen, Users, TrendingUp, Shield } from "lucide-react";

interface HealthInsightDetailProps {
  insightType: string;
  onBack: () => void;
}

const HealthInsightDetail: React.FC<HealthInsightDetailProps> = ({ insightType, onBack }) => {
  const insights = {
    'hormonal-balance': {
      title: "Hormonal Balance & Skin Health",
      subtitle: "Understanding the complex relationship between hormones and skin conditions",
      stat: "72%",
      statDescription: "of people with recurring acne have gut or hormonal imbalances",
      content: {
        overview: "Hormonal imbalances can significantly impact skin health, particularly in women. Fluctuations in estrogen, progesterone, and testosterone levels can trigger various skin conditions including acne, melasma, and premature aging.",
        keyPoints: [
          "Estrogen helps maintain skin thickness and collagen production",
          "Progesterone can increase oil production, leading to breakouts",
          "Testosterone stimulates sebum production in both men and women",
          "Cortisol (stress hormone) can worsen inflammatory skin conditions",
          "Thyroid hormones affect skin moisture and texture"
        ],
        symptoms: [
          "Persistent acne along jawline and chin",
          "Dark spots or melasma on face",
          "Dry, flaky skin or excessive oiliness",
          "Hair loss or excessive facial hair",
          "Premature aging signs"
        ],
        solutions: [
          "Hormone testing and consultation with endocrinologist",
          "Dietary changes to support hormone balance",
          "Stress management techniques",
          "Targeted skincare with hormone-friendly ingredients",
          "Lifestyle modifications including sleep and exercise"
        ],
        studies: [
          "A 2019 study in the Journal of Clinical Endocrinology found that 72% of women with PCOS experience severe acne",
          "Research published in Dermatology Online Journal shows hormonal acne affects 85% of women during menstruation",
          "A 2020 study in the International Journal of Women's Dermatology linked hormonal imbalances to premature skin aging"
        ]
      }
    },
    'nutrition-hair': {
      title: "Nutrition & Hair Health",
      subtitle: "How internal nutrition directly affects hair growth and quality",
      stat: "80%",
      statDescription: "of women experience hair thinning, with more than half linked to internal health issues",
      content: {
        overview: "Hair health is a direct reflection of internal nutrition and overall health. Deficiencies in key nutrients can lead to hair loss, thinning, and poor hair quality. The hair follicle is one of the most metabolically active structures in the body.",
        keyPoints: [
          "Protein deficiency leads to weak, brittle hair",
          "Iron deficiency causes diffuse hair loss",
          "Vitamin D deficiency affects hair follicle cycling",
          "Biotin deficiency can cause hair thinning",
          "Zinc deficiency leads to hair loss and slow growth"
        ],
        symptoms: [
          "Excessive hair shedding (more than 100 hairs per day)",
          "Thinning hair, especially at crown or temples",
          "Brittle, dry, or easily breakable hair",
          "Slow hair growth or hair that won't grow past certain length",
          "Changes in hair texture or color"
        ],
        solutions: [
          "Comprehensive nutrient panel testing",
          "Balanced diet rich in protein, iron, and vitamins",
          "Targeted supplementation based on deficiencies",
          "Scalp massage and circulation improvement",
          "Gentle hair care practices to prevent breakage"
        ],
        studies: [
          "A 2017 study in Dermatology Practical & Conceptual found that 68% of women with hair loss had iron deficiency",
          "Research in the Journal of Clinical and Aesthetic Dermatology shows biotin supplementation improves hair growth in 38% of cases",
          "A 2020 study in Nutrients linked vitamin D deficiency to alopecia areata in 89% of patients"
        ]
      }
    },
    'stress-skin': {
      title: "Stress & Skin Conditions",
      subtitle: "The profound impact of chronic stress on skin health and healing",
      stat: "Chronic stress",
      statDescription: "can trigger inflammatory skin conditions and disrupt natural healing processes",
      content: {
        overview: "Chronic stress triggers a cascade of hormonal and inflammatory responses that can severely impact skin health. The skin-brain axis means that psychological stress directly affects skin barrier function, inflammation, and healing processes.",
        keyPoints: [
          "Cortisol increases inflammation throughout the body",
          "Stress disrupts the skin's natural barrier function",
          "Chronic stress slows wound healing by up to 40%",
          "Stress hormones can trigger or worsen existing skin conditions",
          "Stress affects sleep quality, which impacts skin regeneration"
        ],
        symptoms: [
          "Increased acne breakouts during stressful periods",
          "Eczema or psoriasis flare-ups",
          "Delayed healing of cuts, scrapes, or acne scars",
          "Dull, tired-looking skin",
          "Increased sensitivity or irritation"
        ],
        solutions: [
          "Stress management techniques (meditation, yoga, deep breathing)",
          "Regular exercise to reduce cortisol levels",
          "Adequate sleep (7-9 hours per night)",
          "Skincare routine focused on barrier repair",
          "Professional help for chronic stress or anxiety"
        ],
        studies: [
          "A 2014 study in Brain, Behavior, and Immunity found that stress delays wound healing by 40%",
          "Research in the Journal of Investigative Dermatology shows stress increases skin inflammation markers by 200%",
          "A 2018 study in Psychoneuroendocrinology linked chronic stress to accelerated skin aging"
        ]
      }
    },
    'gut-skin': {
      title: "Gut Health & Skin Connection",
      subtitle: "The gut-skin axis and how digestive health impacts skin clarity",
      stat: "Gut-skin axis",
      statDescription: "shows how digestive health directly impacts skin clarity and overall appearance",
      content: {
        overview: "The gut-skin axis is a bidirectional communication system between the gastrointestinal tract and the skin. An unhealthy gut microbiome can lead to systemic inflammation, nutrient malabsorption, and skin conditions. The gut is home to 70% of the immune system, which directly affects skin health.",
        keyPoints: [
          "Gut dysbiosis leads to increased intestinal permeability",
          "Leaky gut allows toxins and bacteria to enter bloodstream",
          "Inflammation from gut issues manifests as skin problems",
          "Gut bacteria produce vitamins and compounds that affect skin",
          "Food sensitivities often show up as skin reactions"
        ],
        symptoms: [
          "Chronic acne, especially around mouth and chin",
          "Eczema or atopic dermatitis",
          "Rosacea or facial redness",
          "Psoriasis flare-ups",
          "General skin inflammation or sensitivity"
        ],
        solutions: [
          "Probiotic supplementation to restore gut microbiome",
          "Elimination diet to identify food triggers",
          "Increase fiber intake for gut health",
          "Reduce processed foods and sugar",
          "Consider digestive enzyme supplements"
        ],
        studies: [
          "A 2018 study in the Journal of Clinical Gastroenterology found that 54% of acne patients had gut dysbiosis",
          "Research in Gut Microbes shows probiotics reduce skin inflammation by 23%",
          "A 2020 study in Dermatology Online Journal linked leaky gut to 78% of chronic skin conditions"
        ]
      }
    }
  };

  const insight = insights[insightType as keyof typeof insights];

  if (!insight) {
    return (
      <div className="h-full overflow-y-auto scrollbar-thin smooth-scroll">
        <div className="max-w-4xl mx-auto p-6 pt-20 lg:pt-6">
          <div className="text-center">
            <h2 className="text-2xl font-md text-gray-900 mb-4">Insight Not Found</h2>
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Insights
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-thin smooth-scroll">
      <div className="max-w-4xl mx-auto p-6 pt-20 lg:pt-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-md text-gray-900 mb-2">{insight.title}</h1>
            <p className="text-gray-600">{insight.subtitle}</p>
          </div>
        </div>

        {/* Key Stat */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-blue-600">{insight.stat}</div>
              <div className="text-gray-700 font-medium">{insight.statDescription}</div>
            </div>
          </CardContent>
        </Card>

        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{insight.content.overview}</p>
          </CardContent>
        </Card>

        {/* Key Points */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Key Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insight.content.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Symptoms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-600" />
              Common Symptoms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insight.content.symptoms.map((symptom, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{symptom}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Solutions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              Recommended Solutions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insight.content.solutions.map((solution, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{solution}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Research Studies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-blue-600" />
              Research Studies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insight.content.studies.map((study, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 text-sm leading-relaxed">{study}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button onClick={onBack} variant="outline" className="w-full sm:w-auto">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Insights
          </Button>
          <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
            <ExternalLink className="w-4 h-4 mr-2" />
            Consult an Expert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HealthInsightDetail;
