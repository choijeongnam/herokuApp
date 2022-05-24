package com.heroku.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.heroku.demo.domain.Webpush;

@Repository
public interface WebpushRepository extends JpaRepository<Webpush, Long> {
}
