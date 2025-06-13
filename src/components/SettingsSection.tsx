'use client';

import React, { useState } from 'react';
import styles from './SettingsSection.module.css';

const SettingsSection: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [lastFetchResult, setLastFetchResult] = useState<any>(null);

    const handleFetchTimeline = async () => {
        setIsLoading(true);
        try {
            console.log('Fetching timeline...');
            const response = await fetch('/api/fetch-timeline');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Timeline data fetched successfully:', result);
            setLastFetchResult(result);
        } catch (error) {
            console.error('Error fetching timeline:', error);
            setLastFetchResult({
                error: true,
                message: 'Failed to fetch timeline data',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearTimeline = async () => {
        if (!window.confirm('Are you sure you want to clear all timeline items? This action cannot be undone.')) {
            return;
        }

        setIsLoading(true);
        try {
            console.log('Clearing timeline...');
            const response = await fetch('/api/clear-timeline', {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Timeline cleared successfully:', result);
            setLastFetchResult({
                error: false,
                message: `Timeline cleared successfully. ${result.deletedCount} items removed.`,
                data: result
            });

            // Optionally refresh the timeline data after clearing
            handleFetchTimeline();
        } catch (error) {
            console.error('Error clearing timeline:', error);
            setLastFetchResult({
                error: true,
                message: 'Failed to clear timeline',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddRehabItem = async () => {
        try {
            console.log('Adding rehab item...');
            const response = await fetch('/api/add-rehab-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Rehab item added successfully:', result);

            // Optionally refresh the timeline data after adding
            handleFetchTimeline();
        } catch (error) {
            console.error('Error adding rehab item:', error);
            setLastFetchResult({
                error: true,
                message: 'Failed to add rehab item',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    const handleAddEvaluationItem = async () => {
        try {
            console.log('Adding evaluation item...');
            const response = await fetch('/api/add-evaluation-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Evaluation item added successfully:', result);

            // Optionally refresh the timeline data after adding
            handleFetchTimeline();
        } catch (error) {
            console.error('Error adding evaluation item:', error);
            setLastFetchResult({
                error: true,
                message: 'Failed to add evaluation item',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    const handleAddReturnToPlayItem = async () => {
        try {
            console.log('Adding return to play item...');
            const response = await fetch('/api/add-return-to-play-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Return to Play item added successfully:', result);

            // Optionally refresh the timeline data after adding
            handleFetchTimeline();
        } catch (error) {
            console.error('Error adding return to play item:', error);
            setLastFetchResult({
                error: true,
                message: 'Failed to add return to play item',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    const handleAddReturnToLearnItem = async () => {
        try {
            console.log('Adding return to learn item...');
            const response = await fetch('/api/add-return-to-learn-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Return to Learn item added successfully:', result);

            // Optionally refresh the timeline data after adding
            handleFetchTimeline();
        } catch (error) {
            console.error('Error adding return to learn item:', error);
            setLastFetchResult({
                error: true,
                message: 'Failed to add return to learn item',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    return (
        <section className={styles.settingsSection}>
            <div className={styles.settingsContainer}>
                <h2 className={styles.sectionTitle}>Settings</h2>
                <div className={styles.buttonContainer}>
                    <div className={styles.fetchButtonContainer}>
                        <button
                            className={styles.fetchButton}
                            onClick={handleFetchTimeline}
                            disabled={isLoading}
                        >
                            <span className={styles.buttonIcon}>📋</span>
                            {isLoading ? 'Fetching...' : 'Fetch Timeline'}
                        </button>
                        <button
                            className={styles.clearButton}
                            onClick={handleClearTimeline}
                            disabled={isLoading}
                        >
                            <span className={styles.buttonIcon}>🗑️</span>
                            {isLoading ? 'Clearing...' : 'Clear Timeline'}
                        </button>
                    </div>
                    <div className={styles.actionButtonsContainer}>
                        <button
                            className={styles.actionButton}
                            onClick={handleAddRehabItem}
                        >
                            <span className={styles.buttonIcon}>💪</span>
                            Add Rehab Item
                        </button>
                        <button
                            className={styles.actionButton}
                            onClick={handleAddEvaluationItem}
                        >
                            <span className={styles.buttonIcon}>📊</span>
                            Add Evaluation Item
                        </button>
                        <button
                            className={styles.actionButton}
                            onClick={handleAddReturnToPlayItem}
                        >
                            <span className={styles.buttonIcon}>⚽</span>
                            Add Return to Play Item
                        </button>
                        <button
                            className={styles.actionButton}
                            onClick={handleAddReturnToLearnItem}
                        >
                            <span className={styles.buttonIcon}>📚</span>
                            Add Return to Learn Item
                        </button>
                    </div>
                </div>
                {lastFetchResult && (
                    <div className={styles.debugInfo}>
                        <h3>Last Fetch Result:</h3>
                        <pre>{JSON.stringify(lastFetchResult, null, 2)}</pre>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SettingsSection; 