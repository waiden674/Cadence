#![no_std]

extern crate alloc;

#[cfg(test)]
#[macro_use]
extern crate std;

pub use hotg_rune_core::{HasOutputs, Tensor};
use hotg_rune_proc_blocks::{ProcBlock, Transform};

// TODO: Add Generics

#[derive(Debug, Clone, PartialEq, ProcBlock)]
#[transform(input = [u8; _], output = [i32; _])]
pub struct InputTypeConversion {}

impl InputTypeConversion {
    pub const fn new() -> Self {
        InputTypeConversion {}
    }
}

impl Default for InputTypeConversion {
    fn default() -> Self {
        InputTypeConversion::new()
    }
}

impl Transform<Tensor<u8>> for InputTypeConversion {
    type Output = Tensor<i32>;

    fn transform(&mut self, input: Tensor<u8>) -> Self::Output {
        input.map(|_dims, &value| value as i32)
    }
}

impl HasOutputs for InputTypeConversion {
    fn set_output_dimensions(&mut self, dimensions: &[usize]) {
        assert_eq!(
            dimensions.len(),
            2,
            "This proc block only supports 2D outputs (requested output: {:?})",
            dimensions
        );
    }
}
