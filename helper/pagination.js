export const getPagination = (page = 1) => {
  const limit = 10;
  const offset = (parseInt(page) - 1) * limit;

  return { limit, offset };
};

export const getPaginationResponse = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = parseInt(page) || 1;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    items,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      limit,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    },
  };
};
