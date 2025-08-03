package com.seeder.userservice.repository;

import com.seeder.userservice.entity.UserFundDashboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFundDashboardRepository extends JpaRepository<UserFundDashboard, Integer> {
}
