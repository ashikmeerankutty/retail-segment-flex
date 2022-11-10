import { Box, Grid } from '@twilio-paste/core';
import React from 'react'

export interface CheckoutSummaryProps {
  handlePlaceOrder: () => void;
}

const CheckoutSummary = ({handlePlaceOrder}: CheckoutSummaryProps) => {
  return (
    <Box>
      <Grid>
        
      </Grid>
    </Box>
  )
}

export default CheckoutSummary