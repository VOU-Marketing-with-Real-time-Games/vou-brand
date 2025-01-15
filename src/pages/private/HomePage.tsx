import { useState, useEffect } from "react";
import DocumentMeta from "react-document-meta";
import metadata from "../../utils/metadata";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import StatCard, { StatCardProps } from "../../components/cards/StatCard.tsx";
import SessionsChart from "../../components/charts/SessionsChart.tsx";
import userApi from "../../api/user.api";
import campaignApi from "../../api/campaign.api";
import brandApi from "../../api/brand.api.ts";

const HomePage = () => {
  const [userData, setUserData] = useState<StatCardProps | null>(null);
  const [campaignData, setCampaignData] = useState<StatCardProps | null>(null);
  const [brandData, setBrandData] = useState<StatCardProps | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      const results = await Promise.allSettled([
        userApi.getUserStatistics(),
        campaignApi.getCampaignStatistics(),
        brandApi.getBrandStatistics(),
      ]);

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          if (index === 0) setUserData(result.value);
          if (index === 1) setCampaignData(result.value);
          if (index === 2) setBrandData(result.value);
        } else {
          console.error(`Failed to fetch data for index ${index}`, result.reason);
        }
      });
    };

    fetchStatistics().then();
  }, []);

  return (
    <DocumentMeta {...metadata.homeMeta}>
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Overview
        </Typography>
        <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
          {userData && (
            <Grid size={4}>
              <StatCard {...userData} />
            </Grid>
          )}
          {campaignData && (
            <Grid size={4}>
              <StatCard {...campaignData} />
            </Grid>
          )}
          {brandData && (
            <Grid size={4}>
              <StatCard {...brandData} />
            </Grid>
          )}
          <Grid size={12}>
            <SessionsChart />
          </Grid>
        </Grid>
      </Box>
    </DocumentMeta>
  );
};

export default HomePage;