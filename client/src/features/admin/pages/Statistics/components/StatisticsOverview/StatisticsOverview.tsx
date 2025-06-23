import { useStatisticsOverview } from './StatisticsOverview.hook';
import { STATISTICS_OVERVIEW_STYLES } from './StatisticsOverview.styles';
import type { StatisticsOverviewProps } from './StatisticsOverview.types';

/**
 * @component StatisticsOverview
 * @description Overview statistics component displaying key metrics
 *
 * @dependencies useStatisticsOverview hook, StatisticsOverview.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const StatisticsOverview = (props: StatisticsOverviewProps) => {
    const { overviewCards } = useStatisticsOverview(props);

    return (
        <div className={STATISTICS_OVERVIEW_STYLES.container}>
            <h2 className={STATISTICS_OVERVIEW_STYLES.title}>Vue d'ensemble</h2>
            <div className={STATISTICS_OVERVIEW_STYLES.grid}>
                {overviewCards.map((card, index) => (
                    <div key={index} className={STATISTICS_OVERVIEW_STYLES.card.container}>
                        <div className={STATISTICS_OVERVIEW_STYLES.card.header}>
                            <div className={STATISTICS_OVERVIEW_STYLES.card.icon}>{card.icon}</div>
                            <div className={STATISTICS_OVERVIEW_STYLES.card.value}>
                                {card.value}
                                {card.suffix}
                            </div>
                        </div>
                        <div className={STATISTICS_OVERVIEW_STYLES.card.footer}>
                            <h3 className={STATISTICS_OVERVIEW_STYLES.card.title}>{card.title}</h3>
                            <p className={STATISTICS_OVERVIEW_STYLES.card.description}>
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatisticsOverview;
