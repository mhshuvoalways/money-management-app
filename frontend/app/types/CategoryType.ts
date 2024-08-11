export interface GetCategoryType {
  _id: string;
  categoryPosition: number;
  categoryName: string;
  categoryType: string;
  icon: {
    emoji: string;
    bgColor: string;
  };
}

export interface PostCategoryType {
  _id?: string;
  categoryPosition?: number;
  categoryName?: string;
  categoryType?: string;
  icon?: {
    emoji?: string;
    bgColor?: string;
  };
}
