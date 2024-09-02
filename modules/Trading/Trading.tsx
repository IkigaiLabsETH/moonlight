import React from 'react';
import { Line } from 'react-chartjs-2';
import { Button, Input, Progress } from '@shadcn/ui';
import { Card as ShadcnCard } from '@shadcn/ui'; // Update with the correct name if necessary
import { Table as ShadcnTable } from '@shadcn/ui'; // Update with the correct name if necessary
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TradingInterface: React.FC = () => {
    const data = {
        labels: ['22:40', '22:41', '22:42', '22:43', '22:44'],
        datasets: [
            {
                label: 'VIBES Price',
                data: [0.000038, 0.000036, 0.000037, 0.000034, 0.000034],
                borderColor: 'rgba(102, 126, 234, 1)',
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'VIBES / SOL Price Chart',
            },
        },
    };

    return (
        <div className="p-4 bg-gray-900 text-white min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <ShadcnCard className="col-span-2 p-4 bg-gray-800">
                    <h2 className="text-xl mb-4">VIBES($ VIBES) / SOL</h2>
                    <div className="bg-gray-700 p-4 h-64">
                        <Line data={data} options={options} />
                    </div>
                    <div className="mt-4 text-sm text-gray-400">
                        <p>O: 0.000038 H: 0.000038 L: 0.000034 C: 0.000034 (-8.11%)</p>
                    </div>
                </ShadcnCard>

                <ShadcnCard className="p-4 bg-gray-800">
                    <h2 className="text-xl mb-4">Buy / Sell</h2>
                    <Input placeholder="Enter the amount" className="mb-4 bg-gray-700" />
                    <div className="flex gap-2 mb-4">
                        <Button className="bg-purple-700">100 SOL</Button>
                        <Button className="bg-purple-700">500 SOL</Button>
                        <Button className="bg-purple-700">1000 SOL</Button>
                        <Button className="bg-purple-700">5000 SOL</Button>
                    </div>
                    <Button className="w-full bg-purple-700 mb-4">Connect Wallet</Button>
                    <Progress value={0.16} className="bg-gray-600 text-sm text-gray-400" />
                    <p className="text-sm mt-2 text-gray-400">
                        Bonding Curve Progress: 0.16%
                    </p>
                    <p className="text-sm text-gray-400">
                        There are 794,883,452.48 VIBES still available for sale in the bonding curve...
                    </p>
                </ShadcnCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                <ShadcnCard className="col-span-2 p-4 bg-gray-800">
                    <h2 className="text-xl mb-4">Trading History</h2>
                    <ShadcnTable>
                        <thead>
                            <tr>
                                <th>Account</th>
                                <th>Type</th>
                                <th>SOL</th>
                                <th>VIBES</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>TRQj...MGyH</td>
                                <td>Sell</td>
                                <td>1,484.61</td>
                                <td>43,550,774.29</td>
                                <td>6 minutes ago</td>
                            </tr>
                            <tr>
                                <td>TFQw...Eyxp</td>
                                <td>Sell</td>
                                <td>792.04</td>
                                <td>21,808,294.3</td>
                                <td>6 minutes ago</td>
                            </tr>
                            <tr>
                                <td>TCEH...g962</td>
                                <td>Sell</td>
                                <td>693.17</td>
                                <td>18,355,953.79</td>
                                <td>8 minutes ago</td>
                            </tr>
                        </tbody>
                    </ShadcnTable>
                </ShadcnCard>

                <ShadcnCard className="p-4 bg-gray-800">
                    <h2 className="text-xl mb-4">Holder Distribution</h2>
                    <ShadcnTable>
                        <thead>
                            <tr>
                                <th>Holder</th>
                                <th>Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>TTfw...7AAw</td>
                                <td>99.48% (Bonding Curve)</td>
                            </tr>
                            <tr>
                                <td>TGge...a3PC</td>
                                <td>0.25%</td>
                            </tr>
                            <tr>
                                <td>TWJC...3Zfz</td>
                                <td>0.25%</td>
                            </tr>
                        </tbody>
                    </ShadcnTable>
                </ShadcnCard>
            </div>
        </div>
    );
};

export default TradingInterface;