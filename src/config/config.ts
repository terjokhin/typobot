export const antibotTimeoutMs = 10000;

export const restrictObj = {
  permissions: {
    can_send_messages: false,
    can_send_polls: false,
    can_invite_users: false,
    can_send_media_messages: false,
    can_send_other_messages: false,
    can_add_web_page_previews: false,
  },
};

export const unrestrictObj = {
  permissions: {
    can_send_messages: true,
    can_send_polls: true,
    can_invite_users: true,
    can_send_media_messages: true,
    can_send_other_messages: true,
    can_add_web_page_previews: true,
  },
};
