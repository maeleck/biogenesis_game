import { GeneCard } from '../types';

export const GENE_CARDS: GeneCard[] = [
    {
        id: 'taq_polymerase',
        name: 'Taq Polymerase',
        description: 'An enzyme isolated from the thermophilic bacterium Thermus aquaticus. It is a thermostable DNA polymerase, meaning it can withstand the high temperatures required for DNA denaturation in the polymerase chain reaction (PCR).',
        application: 'Revolutionized molecular biology by enabling PCR, a technique used to amplify a single copy or a few copies of a segment of DNA across several orders of magnitude, generating thousands to millions of copies of a particular DNA sequence.'
    },
    {
        id: 'cas9',
        name: 'Cas9 Nuclease',
        description: 'A protein that plays a vital role in the immunological defense of certain bacteria against DNA viruses and plasmids. It is an enzyme that uses a guide RNA molecule to find and cut a specific target sequence of DNA.',
        application: 'The cornerstone of the CRISPR-Cas9 gene-editing technology. It allows scientists to make precise changes to the DNA of living organisms, with vast potential for treating genetic diseases.'
    },
    {
        id: 'gfp',
        name: 'Green Fluorescent Protein (GFP)',
        description: 'A protein composed of 238 amino acid residues that exhibits bright green fluorescence when exposed to light in the blue to ultraviolet range. It was first isolated from the jellyfish Aequorea victoria.',
        application: 'Used as a reporter gene and a visual tag in molecular biology. Scientists can attach the GFP gene to other genes of interest to watch the movement and localization of proteins in real-time within living cells.'
    },
    {
        id: 'insulin',
        name: 'Insulin Gene',
        description: 'The gene that provides instructions for making the hormone insulin. Insulin regulates the amount of glucose in the blood, allowing cells to absorb it for energy.',
        application: 'Using recombinant DNA technology, the human insulin gene was inserted into E. coli bacteria, which then produce large quantities of synthetic human insulin. This is a life-saving treatment for people with Type 1 diabetes.'
    },
    {
        id: 'hgh',
        name: 'Human Growth Hormone (HGH) Gene',
        description: 'Provides instructions for making human growth hormone, a protein that plays a crucial role in controlling the body\'s growth and metabolism.',
        application: 'Recombinant HGH is used to treat growth disorders in children and growth hormone deficiency in adults. It was one of the first successes of biotechnology, replacing the risky practice of extracting the hormone from human cadavers.'
    },
    {
        id: 'luciferase',
        name: 'Luciferase',
        description: 'A generic term for a class of oxidative enzymes that produce bioluminescence, or "living light". It is famously responsible for the glow of fireflies.',
        application: 'Widely used in biotechnology as a reporter gene. Its light-producing properties make it easy to detect and quantify, allowing researchers to study gene expression and other cellular processes with high sensitivity.'
    },
    {
        id: 'tert',
        name: 'Telomerase (TERT)',
        description: 'The gene for Telomerase Reverse Transcriptase, a key component of the enzyme that maintains the protective caps (telomeres) on the ends of chromosomes.',
        application: 'A major focus of anti-aging and cancer research. While its activity in most body cells is low, cancer cells often reactivate it to achieve a form of cellular immortality, making it a prime target for therapies.'
    },
    {
        id: 'p53',
        name: 'p53',
        description: 'Often called the "guardian of the genome," this gene codes for a protein that regulates the cell cycle and functions as a tumor suppressor. It can halt cell division or trigger cell death (apoptosis) in response to DNA damage.',
        application: 'Mutations in the p53 gene are found in over 50% of all human cancers. Understanding its function is central to oncology and the development of new cancer treatments.'
    },
    {
        id: 'myod',
        name: 'MyoD',
        description: 'A "master regulator" gene that codes for a transcription factor which can convert many different cell types directly into muscle cells.',
        application: 'A crucial tool in stem cell research and regenerative medicine. Studying MyoD helps scientists understand how to control cell differentiation and potentially grow new muscle tissue to treat injuries and diseases like muscular dystrophy.'
    },
    {
        id: 'foxp2',
        name: 'FOXP2',
        description: 'One of the first genes to be strongly implicated in the development of speech and language. It codes for a transcription factor that regulates many other genes.',
        application: 'Studying FOXP2 provides insights into the neurobiological basis of human language and its evolution. It helps researchers understand how the human brain is wired for this unique and complex cognitive ability.'
    }
];
