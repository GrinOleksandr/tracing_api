import { Model } from 'mongoose';
import { SORT_FIELDS, SORT_ORDER, IPagination } from '../types';

export const paginate = async (
  model: Model<any>,
  options: {
    filters: Record<string, unknown>;
    skip?: number;
    limit?: number;
    sortBy?: SORT_FIELDS;
    order?: SORT_ORDER;
  },
): Promise<IPagination<typeof model>> => {
  const {
    filters,
    skip = 0,
    limit = 10,
    sortBy = SORT_FIELDS.CREATED_AT,
    order = SORT_ORDER.DESC,
  } = options;
  const data = await model.find(filters, null, {
    sort: { [sortBy]: order === SORT_ORDER.ASC ? 1 : -1 },
    skip,
    limit,
  });

  const totalDocumentsCount = await model.countDocuments(filters);

  return {
    skip,
    limit,
    total: totalDocumentsCount,
    data,
  };
};
