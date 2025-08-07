import { AdService, RewardedAd } from '../types';

/**
 * Placeholder for Google AdSense integration.
 * This service simulates the behavior of a rewarded video ad SDK.
 * In a real implementation, this would contain the actual AdSense code.
 */

// Simulating the AdSense SDK
class MockAdSenseService implements AdService {
    loadRewardedAd(callbacks: {
        onAdLoaded: (ad: RewardedAd) => void;
        onAdFailedToLoad: (error: string) => void;
    }) {
        // Simulate a network request to load an ad
        setTimeout(() => {
            const shouldSucceed = true; // Always succeed for the mock service

            if (shouldSucceed) {
                console.log("Simulated Ad: Ad loaded successfully.");
                const rewardedAd: RewardedAd = {
                    show: () => {
                        // In a real implementation, this call would trigger the ad UI from the SDK.
                        // Here, the App.tsx component handles showing the mock AdPlayer.
                        console.log("Simulated Ad: show() called.");
                    }
                };
                callbacks.onAdLoaded(rewardedAd);
            } else {
                console.error("Simulated Ad: Failed to load ad. No fill.");
                callbacks.onAdFailedToLoad("No ad available to show.");
            }
        }, 1500); // Simulate 1.5 second loading time
    }
}

export const adService = new MockAdSenseService();