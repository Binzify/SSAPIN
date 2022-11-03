package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.ReviewRequest;
import com.ssapin.backend.api.domain.dto.response.ReviewResponse;
import com.ssapin.backend.api.domain.entity.User;

import java.util.List;

public interface ReviewService {
public long addReview(ReviewRequest.ReviewAdd request , User user);
public long updateReview(ReviewRequest.ReviewEdit request);
public void deleteReview(long reviewId);

public List<ReviewResponse> findReview(long placeId);
}