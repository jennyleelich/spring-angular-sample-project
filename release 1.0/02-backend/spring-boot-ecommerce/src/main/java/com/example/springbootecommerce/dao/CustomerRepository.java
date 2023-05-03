package com.example.springbootecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springbootecommerce.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
