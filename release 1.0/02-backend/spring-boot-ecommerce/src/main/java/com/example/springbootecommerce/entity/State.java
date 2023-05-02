
package com.example.springbootecommerce.entity;

import java.math.BigDecimal;

import java.util.Date;

import jakarta.persistence.*;


import lombok.Data;

@Entity
@Table(name="state")
@Data
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "name")
    private String name;
    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;
    
}