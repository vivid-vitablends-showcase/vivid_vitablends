import * as reviewService from '../services/review.service.js';

export const getAll = async (req, res, next) => {
  try {
    const filters = {
      showInHero: req.query.showInHero,
      limit: req.query.limit,
    };
    const reviews = await reviewService.getAll(filters);
    res
      .status(200)
      .json({ success: true, data: reviews, count: reviews.length });
  } catch (error) {
    next(error);
  }
};

export const getHeroReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getHeroReviews();
    res
      .status(200)
      .json({ success: true, data: reviews, count: reviews.length });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const review = await reviewService.create(req.body);
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

export const updateShowInHero = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { showInHero } = req.body;
    const review = await reviewService.updateShowInHero(id, showInHero);
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};
