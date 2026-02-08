export const hubspotConfig = {
  // For Free plan use only Portal ID
  portalId: process.env.HUBSPOT_PORTAL_ID || "",
  // token not needed for embedded forms
  useEmbedForms: true, // flag for using embed forms
};

export const hubspotFormIds = {
  videoLead: process.env.HUBSPOT_FORM_VIDEO_LEAD || "",
  resourceDownload: process.env.HUBSPOT_FORM_RESOURCE_DOWNLOAD || "",
  contact: process.env.HUBSPOT_FORM_CONTACT || "",
  newsletter: process.env.HUBSPOT_FORM_NEWSLETTER || "",
};
