package com.heroku.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.heroku.demo.domain.Record;
import com.heroku.demo.repository.RecordRepository;

@Service
@Transactional
public class UserService {

	private RecordRepository recordRepository;

	public UserService(RecordRepository recordRepository) {
		this.recordRepository = recordRepository;
	}

	public void findByToken(String token, String session) {
		List<Record> list = recordRepository.findbyTokenAndId(token, session);
		if(list.size() == 0 || list == null) {
			recordRepository.save(new Record(0, session, token));
		}

	}
}
