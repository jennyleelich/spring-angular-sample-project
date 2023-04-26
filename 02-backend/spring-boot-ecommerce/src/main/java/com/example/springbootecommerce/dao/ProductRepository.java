package com.example.springbootecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springbootecommerce.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
