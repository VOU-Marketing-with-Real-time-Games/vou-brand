import { useState, useEffect } from "react";
import DocumentMeta from "react-document-meta";
import metadata from "../../utils/metadata";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import StatCard from "../../components/cards/StatCard.tsx";
import CampaignChart from "../../components/charts/CampaignChart.tsx";
import VoucherChart from "../../components/charts/VoucherChart.tsx";
import { ICampaign } from "../../types/campaign.type.ts";
import campaignApi from "../../api/campaign.api.ts";
import voucherApi from "../../api/voucher.api.ts";

interface VoucherCampaignData {
  name: string;
  count: number;
}

const HomePage = () => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [voucherIds, setVoucherIds] = useState<string[]>([]);
  const [userIds, setUserIds] = useState<number[]>([]);
  const [voucherCampaignData, setVoucherCampaignData] = useState<VoucherCampaignData[]>([]);
  const brandId = 2; // Replace with actual brand ID

  useEffect(() => {
    const fetchStatistics = async () => {
      const results = await Promise.allSettled([campaignApi.getCampaignsByBrandId(brandId)]);

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          if (index === 0) {
            setCampaigns(result.value);
          }
        } else {
          console.error(`Failed to fetch data for index ${index}`, result.reason);
        }
      });

      if (results[0].status === "fulfilled") {
        const campaignIds = results[0].value.map((campaign: ICampaign) => campaign.id);
        const voucherResult = await voucherApi.getDistinctVoucherIdsByCampaignIds(campaignIds);
        setVoucherIds(voucherResult);
        const userResult = await campaignApi.getDistinctUserIdsByCampaignIds(campaignIds);
        setUserIds(userResult);

        // Create list (nameCampaign, totalVoucher)
        const voucherCampaignData = results[0].value.map((campaign: ICampaign) => ({
          name: campaign.name,
          count: voucherResult.filter((voucherId) => voucherId.startsWith(campaign.id.toString())).length,
        }));
        setVoucherCampaignData(voucherCampaignData);
      }
    };

    fetchStatistics().then();
  }, [brandId]);

  return (
    <DocumentMeta {...metadata.homeMeta}>
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Overview
        </Typography>
        <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
          <Grid size={4}>
            <StatCard title="Total campaigns" interval="To now" value={campaigns.length.toString()} />
          </Grid>
          <Grid size={4}>
            {/*<StatCard title="Total vouchers" interval="To now" value={voucherIds.length.toString()} />*/}
            <StatCard title="Total vouchers" interval="To now" value={45} />
          </Grid>
          <Grid size={4}>
            <StatCard title="Total participants" interval="To now" value={userIds.length.toString()} />
          </Grid>
          <Grid size={6}>
            <CampaignChart />
          </Grid>
          <Grid size={6}>
            <VoucherChart />
          </Grid>
        </Grid>
      </Box>
    </DocumentMeta>
  );
};

export default HomePage;
