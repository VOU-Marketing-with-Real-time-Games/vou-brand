import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";

const data = [
  { label: "Flappy Bird", value: 5000 },
  { label: "Shake Game", value: 3500 },
  { label: "Wheel of Fortune", value: 1000 },
];

const games = [
  {
    name: "Flappy Bird",
    value: 50,
    color: "hsl(220, 25%, 65%)",
  },
  {
    name: "Shake Game",
    value: 35,
    color: "hsl(220, 25%, 45%)",
  },
  {
    name: "Wheel of fortune",
    value: 10,
    color: "hsl(220, 25%, 30%)",
  },
];

interface StyledTextProps {
  variant: "primary" | "secondary";
}

const StyledText = styled("text", {
  shouldForwardProp: (prop) => prop !== "variant",
})<StyledTextProps>(({ theme }) => ({
  textAnchor: "middle",
  dominantBaseline: "central",
  fill: theme.palette.text.secondary,
  variants: [
    {
      props: {
        variant: "primary",
      },
      style: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    {
      props: ({ variant }) => variant !== "primary",
      style: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    {
      props: {
        variant: "primary",
      },
      style: {
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== "primary",
      style: {
        fontWeight: theme.typography.body2.fontWeight,
      },
    },
  ],
}));

interface PieCenterLabelProps {
  primaryText: string;
  secondaryText: string;
}

function PieCenterLabel({ primaryText, secondaryText }: PieCenterLabelProps) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

const colors = ["hsl(220, 20%, 65%)", "hsl(220, 20%, 42%)", "hsl(220, 20%, 35%)", "hsl(220, 20%, 25%)"];

export default function GamePieChart() {
  return (
    <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="h6">
          Game Turns by User
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }} flexGrow={1} width="80%">
          <PieChart
            colors={colors}
            series={[
              {
                data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: "global", highlighted: "item" },
              },
            ]}
            height={293}
            width={180}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            <PieCenterLabel primaryText="9500" secondaryText="Total" />
          </PieChart>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {games.map((country, index) => (
              <Stack key={index} direction="row" sx={{ alignItems: "center", gap: 2, pb: 2 }}>
                <Stack sx={{ gap: 1, flexGrow: 1 }}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: "500" }}>
                      {country.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {country.value}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    aria-label="Number of users by country"
                    value={country.value}
                    sx={{
                      [`& .${linearProgressClasses.bar}`]: {
                        backgroundColor: country.color,
                      },
                    }}
                  />
                </Stack>
              </Stack>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
