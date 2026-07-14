/*
 * Copyright (c) 2026, Salesforce, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Box} from '@salesforce/retail-react-app/app/components/shared/ui'
import {getMarkupHtml} from '../../utils'

/**
 * Page Designer `commerce_assets.campaignBanner` — header promo strip.
 */
export const CampaignBanner = ({bannerMessage}) => {
    const html = getMarkupHtml(bannerMessage)
    if (!html) return null

    return (
        <Box
            className="pd-campaign-banner"
            w="100%"
            bg="#004a82"
            color="white"
            textAlign="center"
            py={2}
            px={4}
            fontSize="sm"
            fontWeight="600"
            borderBottom="3px solid"
            borderColor="orange.500"
            dangerouslySetInnerHTML={{__html: html}}
        />
    )
}

CampaignBanner.displayName = 'CampaignBanner'

CampaignBanner.propTypes = {
    bannerMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

export default CampaignBanner
