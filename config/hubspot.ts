export const hubspotConfig = {
  // Для Free плана используем только Portal ID
  portalId: process.env.HUBSPOT_PORTAL_ID || "",
  // token не нужен для встроенных форм
  useEmbedForms: true, // флаг для использования embed форм
};

export const hubspotFormIds = {
  videoLead: process.env.HUBSPOT_FORM_VIDEO_LEAD || "",
  resourceDownload: process.env.HUBSPOT_FORM_RESOURCE_DOWNLOAD || "",
  contact: process.env.HUBSPOT_FORM_CONTACT || "",
  newsletter: process.env.HUBSPOT_FORM_NEWSLETTER || "",
};
