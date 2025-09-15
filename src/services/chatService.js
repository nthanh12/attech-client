export const chatServices = {
  whatsapp: (phoneNumber) =>
    window.open(`https://wa.me/${phoneNumber}`, "_blank"),
  zalo: (zaloId) => window.open(`https://zalo.me/${zaloId}`, "_blank"),
  tawkto: () => window.Tawk_API?.toggle(),
};

export const openChat = (service = "whatsapp", config = {}) => {
  const serviceFn = chatServices[service];
  if (serviceFn) {
    serviceFn(config.phoneNumber || config.zaloId);
  } else {}
};
