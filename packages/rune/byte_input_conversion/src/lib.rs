#![no_std]

extern crate alloc;

// #[cfg(test)]
// #[macro_use]
// extern crate std;

use alloc::{
    string::String,
    vec::{self, Vec},
};
use core::str;
pub use hotg_rune_core::{HasOutputs, Tensor};
use hotg_rune_proc_blocks::{ProcBlock, Transform};
use log::info;

#[derive(Debug, Clone, PartialEq, ProcBlock)]
#[transform(input = [u8; _], output = [i32; _])]
pub struct ByteInputConversion {}

impl ByteInputConversion {
    pub const fn new() -> Self {
        ByteInputConversion {}
    }
}

impl Default for ByteInputConversion {
    fn default() -> Self {
        ByteInputConversion::new()
    }
}

impl Transform<Tensor<u8>> for ByteInputConversion {
    type Output = Tensor<i32>;

    fn transform(&mut self, input: Tensor<u8>) -> Self::Output {
        let json = str::from_utf8(input.elements()).expect("Error parsing file");
        let (deserialized, _bytes_read) =
            serde_json_core::from_str::<Vec<i32>>(json.trim_end_matches(char::from(0)))
                .expect("Error deserializing json");

        Tensor::new_row_major(deserialized.into(), alloc::vec![1, 384])
    }
}

impl HasOutputs for ByteInputConversion {
    fn set_output_dimensions(&mut self, dimensions: &[usize]) {
        assert_eq!(
            dimensions.len(),
            2,
            "This proc block only supports 2D outputs (requested output: {:?})",
            dimensions
        );
    }
}
