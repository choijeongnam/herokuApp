package com.heroku.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.heroku.demo.domain.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
	@Query(value = "SELECT * FROM record WHERE token = :token AND session_id = :session_id", nativeQuery = true)
	public List<Record> findbyTokenAndId(@Param("token") String token, @Param("session_id") String session_id);
}
