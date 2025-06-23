import { useDashboardStats } from './DashboardStats.hook';
import { DASHBOARD_STATS_STYLES } from './DashboardStats.styles';
import type { DashboardStatsProps } from './DashboardStats.types';

/**
 * @component DashboardStats
 * @description Statistics overview component displaying intervention metrics
 *
 * @dependencies useDashboardStats hook, DashboardStats.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const DashboardStats = (props: DashboardStatsProps) => {
    const { statsData } = useDashboardStats(props);

    return (
        <div className={DASHBOARD_STATS_STYLES.container}>
            <div className={DASHBOARD_STATS_STYLES.grid}>
                {statsData.map((stat, index) => (
                    <div key={index} className={DASHBOARD_STATS_STYLES.card.container}>
                        <div className={DASHBOARD_STATS_STYLES.card.header}>
                            <div className={DASHBOARD_STATS_STYLES.card.icon}>{stat.icon}</div>
                            <div className={DASHBOARD_STATS_STYLES.card.value}>{stat.value}</div>
                        </div>
                        <div className={DASHBOARD_STATS_STYLES.card.footer}>
                            <h3 className={DASHBOARD_STATS_STYLES.card.title}>{stat.title}</h3>
                            <p className={DASHBOARD_STATS_STYLES.card.description}>
                                {stat.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardStats;
