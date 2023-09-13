export const UserKey = (cognitoId: string) => {
  return `user_${cognitoId}`;
};

export const SettingKey = 'setting';

export const UserCommentCountDaily = (userId: number) => {
  return `user_${userId}_comment`;
};

export const UserCommentCountInChapter = (
  userId: number,
  chapterId: number,
) => {
  return `user_${userId}_comment_${chapterId}`;
};
