import React from 'react';
import TradingInterface from '@/modules/Trading/Trading';
import { buyIx, sellIx } from '../api/trading';

const TradingPage: React.FC = () => {
    const handleBuy = async () => {
        try {
            await buyIx();
            alert('Buy transaction successful!');
        } catch (error) {
            console.error('Buy transaction failed:', error);
            alert('Buy transaction failed!');
        }
    };

    const handleSell = async () => {
        try {
            await sellIx();
            alert('Sell transaction successful!');
        } catch (error) {
            console.error('Sell transaction failed:', error);
            alert('Sell transaction failed!');
        }
    };

    return (
        <div>
            <TradingInterface />
            <button onClick={handleBuy}>Buy Tokens</button>
            <button onClick={handleSell}>Sell Tokens</button>
        </div>
    );
};

export default TradingPage;