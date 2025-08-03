package com.seeder.contractservice.dto;

import com.seeder.contractservice.enums.Type;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class ContractsDTO {
    private String name;
    private Type type;
    private double perPayment;
    private double totalFinanced;
    private double totalAvailable;
    private Integer termLength;
    private Integer id;

}



