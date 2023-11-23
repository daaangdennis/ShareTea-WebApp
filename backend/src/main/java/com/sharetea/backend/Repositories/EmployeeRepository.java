package com.sharetea.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}